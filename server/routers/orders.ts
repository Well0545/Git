import { z } from "zod";
import { protectedProcedure, adminProcedure, router } from "../_core/trpc";
import {
  createOrder,
  getOrderById,
  getOrderByNumber,
  getUserOrders,
  updateOrderStatus,
  getOrderItems,
  createOrderItems,
  getCartItems,
  clearCart,
  getProductById,
  updateProduct,
  logInventoryChange,
} from "../db";

// Generate unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `JB${timestamp}${random}`;
}

export const ordersRouter = router({
  list: protectedProcedure
    .input(
      z.object({
        limit: z.number().int().min(1).max(100).default(20),
        offset: z.number().int().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      return await getUserOrders(ctx.user.id, input.limit, input.offset);
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const order = await getOrderById(input.id);

      // Verify ownership
      if (!order || order.userId !== ctx.user.id) {
        throw new Error("Order not found or access denied");
      }

      const items = await getOrderItems(input.id);
      return { ...order, items };
    }),

  getByNumber: protectedProcedure
    .input(z.object({ orderNumber: z.string() }))
    .query(async ({ ctx, input }) => {
      const order = await getOrderByNumber(input.orderNumber);

      // Verify ownership
      if (!order || order.userId !== ctx.user.id) {
        throw new Error("Order not found or access denied");
      }

      const items = await getOrderItems(order.id);
      return { ...order, items };
    }),

  create: protectedProcedure
    .input(
      z.object({
        shippingAddress: z.string().min(1),
        shippingCity: z.string().min(1),
        shippingState: z.string().length(2),
        shippingZipCode: z.string().min(1),
        shippingCost: z.number().int().min(0).default(0),
        discount: z.number().int().min(0).default(0),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get cart items
      const cartItems = await getCartItems(ctx.user.id);

      if (cartItems.length === 0) {
        throw new Error("Cart is empty");
      }

      // Calculate total and verify stock
      let totalAmount = 0;
      const orderItems = [];

      for (const cartItem of cartItems) {
        const product = await getProductById(cartItem.productId);

        if (!product) {
          throw new Error(`Product ${cartItem.productId} not found`);
        }

        if (product.stock < cartItem.quantity) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }

        const itemTotal = product.price * cartItem.quantity;
        totalAmount += itemTotal;

        orderItems.push({
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          price: product.price,
        });
      }

      // Apply discount and shipping
      totalAmount = totalAmount - input.discount + input.shippingCost;

      const orderNumber = generateOrderNumber();
      const orderResult = await createOrder({
        userId: ctx.user.id,
        orderNumber,
        status: "pending",
        totalAmount,
        shippingCost: input.shippingCost,
        discount: input.discount,
        shippingAddress: input.shippingAddress,
        shippingCity: input.shippingCity,
        shippingState: input.shippingState,
        shippingZipCode: input.shippingZipCode,
        trackingNumber: null,
        estimatedDelivery: null,
        notes: input.notes ?? null,
      });

      const orderId = (orderResult as any).insertId as number;

      // Create order items and update stock
      const itemsToCreate = orderItems.map((item) => ({
        orderId,
        ...item,
      }));

      await createOrderItems(itemsToCreate);

      // Update product stock and log changes
      for (const item of orderItems) {
        const product = await getProductById(item.productId);
        if (product) {
          const newStock = product.stock - item.quantity;
          await updateProduct(item.productId, { stock: newStock });

          await logInventoryChange({
            productId: item.productId,
            quantity: -item.quantity,
            reason: "purchase",
            reference: `Order ${orderNumber}`,
            notes: `Sold ${item.quantity} units`,
          });
        }
      }

      // Clear cart
      await clearCart(ctx.user.id);

      return { orderId, orderNumber };
    }),

  updateStatus: adminProcedure
    .input(
      z.object({
        orderId: z.number(),
        status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
        trackingNumber: z.string().optional(),
        estimatedDelivery: z.date().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const order = await getOrderById(input.orderId);
      if (!order) {
        throw new Error("Order not found");
      }

      // If cancelling, restore stock
      if (input.status === "cancelled" && order.status !== "cancelled") {
        const items = await getOrderItems(input.orderId);

        for (const item of items) {
          const product = await getProductById(item.productId);
          if (product) {
            const newStock = product.stock + item.quantity;
            await updateProduct(item.productId, { stock: newStock });

            await logInventoryChange({
              productId: item.productId,
              quantity: item.quantity,
              reason: "return",
              reference: `Order ${order.orderNumber} cancelled`,
              notes: `Returned ${item.quantity} units`,
            });
          }
        }
      }

      return await updateOrderStatus(input.orderId, input.status);
    }),

  cancel: protectedProcedure
    .input(z.object({ orderId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const order = await getOrderById(input.orderId);

      if (!order || order.userId !== ctx.user.id) {
        throw new Error("Order not found or access denied");
      }

      if (order.status !== "pending") {
        throw new Error("Can only cancel pending orders");
      }

      // Restore stock
      const items = await getOrderItems(input.orderId);

      for (const item of items) {
        const product = await getProductById(item.productId);
        if (product) {
          const newStock = product.stock + item.quantity;
          await updateProduct(item.productId, { stock: newStock });

          await logInventoryChange({
            productId: item.productId,
            quantity: item.quantity,
            reason: "return",
            reference: `Order ${order.orderNumber} cancelled by user`,
            notes: `Returned ${item.quantity} units`,
          });
        }
      }

      return await updateOrderStatus(input.orderId, "cancelled");
    }),
});

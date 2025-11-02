import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import {
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getProductById,
} from "../db";

export const cartRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const items = await getCartItems(ctx.user.id);

    // Enrich with product details
    const enrichedItems = await Promise.all(
      items.map(async (item) => {
        const product = await getProductById(item.productId);
        return {
          ...item,
          product,
        };
      })
    );

    return enrichedItems;
  }),

  add: protectedProcedure
    .input(
      z.object({
        productId: z.number(),
        quantity: z.number().int().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify product exists and has stock
      const product = await getProductById(input.productId);
      if (!product) {
        throw new Error("Product not found");
      }

      if (product.stock < input.quantity) {
        throw new Error("Insufficient stock");
      }

      return await addToCart(ctx.user.id, input.productId, input.quantity);
    }),

  update: protectedProcedure
    .input(
      z.object({
        cartItemId: z.number(),
        quantity: z.number().int().min(0),
      })
    )
    .mutation(async ({ input }) => {
      return await updateCartItem(input.cartItemId, input.quantity);
    }),

  remove: protectedProcedure
    .input(z.object({ cartItemId: z.number() }))
    .mutation(async ({ input }) => {
      return await removeFromCart(input.cartItemId);
    }),

  clear: protectedProcedure.mutation(async ({ ctx }) => {
    return await clearCart(ctx.user.id);
  }),
});

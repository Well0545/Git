import { z } from "zod";
import { protectedProcedure, adminProcedure, publicProcedure, router } from "../_core/trpc";
import {
  createPayment,
  getPaymentByOrderId,
  updatePaymentStatus,
  getOrderById,
} from "../db";

export const paymentsRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        orderId: z.number(),
        method: z.enum(["credit_card", "debit_card", "pix", "boleto", "paypal"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify order exists and belongs to user
      const order = await getOrderById(input.orderId);

      if (!order || order.userId !== ctx.user.id) {
        throw new Error("Order not found or access denied");
      }

      // Check if payment already exists
      const existingPayment = await getPaymentByOrderId(input.orderId);
      if (existingPayment) {
        throw new Error("Payment already exists for this order");
      }

      // Create payment record
      const payment = await createPayment({
        orderId: input.orderId,
        userId: ctx.user.id,
        amount: order.totalAmount,
        currency: "BRL",
        status: "pending",
        method: input.method,
        paymentGateway: null,
        transactionId: null,
        metadata: null,
      });

      return payment;
    }),

  getByOrderId: protectedProcedure
    .input(z.object({ orderId: z.number() }))
    .query(async ({ ctx, input }) => {
      const order = await getOrderById(input.orderId);

      if (!order || order.userId !== ctx.user.id) {
        throw new Error("Order not found or access denied");
      }

      const payment = await getPaymentByOrderId(input.orderId);
      return payment;
    }),

  // Webhook for payment confirmation (public, but should be secured with signature verification)
  webhook: publicProcedure
    .input(
      z.object({
        orderId: z.number(),
        transactionId: z.string(),
        status: z.enum(["completed", "failed", "refunded"]),
        gateway: z.string(),
        metadata: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const payment = await getPaymentByOrderId(input.orderId);

      if (!payment) {
        throw new Error("Payment not found");
      }

      // Update payment status
      await updatePaymentStatus(payment.id, input.status);

      // TODO: Update order status based on payment status
      // If payment.status === "completed", update order to "processing"

      return { success: true };
    }),

  // Admin procedure to manually update payment status
  updateStatus: adminProcedure
    .input(
      z.object({
        paymentId: z.number(),
        status: z.enum(["pending", "completed", "failed", "refunded"]),
      })
    )
    .mutation(async ({ input }) => {
      return await updatePaymentStatus(input.paymentId, input.status);
    }),
});

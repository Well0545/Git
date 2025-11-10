import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";

// Mock de cupons válidos - em produção, viria do banco de dados
const VALID_COUPONS: Record<string, { discount: number; type: "percentage" | "fixed"; maxUses?: number; usedCount?: number }> = {
  "BEMVINDO10": { discount: 10, type: "percentage" }, // 10% de desconto
  "PRIMEIRACOMPRA": { discount: 15, type: "percentage" }, // 15% de desconto
  "FRETE15": { discount: 15, type: "fixed" }, // R$ 15 de desconto
  "BLACKFRIDAY20": { discount: 20, type: "percentage" }, // 20% de desconto
  "ELETRONICA50": { discount: 50, type: "fixed" }, // R$ 50 de desconto
};

export const couponsRouter = router({
  /**
   * Validar e aplicar cupom de desconto
   * Retorna o valor do desconto em centavos
   */
  validate: publicProcedure
    .input(
      z.object({
        couponCode: z.string().min(1, "Código do cupom é obrigatório"),
        subtotal: z.number().min(0, "Subtotal deve ser maior que 0"),
      })
    )
    .mutation(({ input }) => {
      const couponCode = input.couponCode.toUpperCase().trim();
      const coupon = VALID_COUPONS[couponCode];

      if (!coupon) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Cupom inválido ou expirado",
        });
      }

      // Verificar limite de uso
      if (coupon.maxUses && coupon.usedCount && coupon.usedCount >= coupon.maxUses) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Este cupom atingiu o limite de uso",
        });
      }

      let discountAmount = 0;

      if (coupon.type === "percentage") {
        discountAmount = Math.floor((input.subtotal * coupon.discount) / 100);
      } else {
        discountAmount = coupon.discount * 100; // Converter para centavos
      }

      // Não permitir desconto maior que o subtotal
      const finalDiscount = Math.min(discountAmount, input.subtotal);

      return {
        success: true,
        couponCode,
        discountType: coupon.type,
        discountValue: coupon.discount,
        discountAmount: finalDiscount,
        message: `Cupom aplicado com sucesso! Desconto de R$ ${(finalDiscount / 100).toFixed(2)}`,
      };
    }),

  /**
   * Listar cupons disponíveis (apenas para demonstração)
   */
  list: publicProcedure.query(() => {
    return Object.entries(VALID_COUPONS).map(([code, coupon]) => ({
      code,
      discount: coupon.discount,
      type: coupon.type,
      description:
        coupon.type === "percentage"
          ? `${coupon.discount}% de desconto`
          : `R$ ${(coupon.discount).toFixed(2)} de desconto`,
    }));
  }),
});

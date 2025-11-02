import { z } from "zod";
import { adminProcedure, router } from "../_core/trpc";
import {
  getTotalSales,
  getTotalOrders,
  getLowStockProducts,
} from "../db";

export const adminRouter = router({
  dashboard: adminProcedure
    .input(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ input }) => {
      const totalSales = await getTotalSales(input.startDate, input.endDate);
      const totalOrders = await getTotalOrders(input.startDate, input.endDate);
      const lowStockProducts = await getLowStockProducts(10);

      return {
        totalSales,
        totalOrders,
        averageOrderValue: totalOrders > 0 ? totalSales / totalOrders : 0,
        lowStockProducts,
      };
    }),

  sales: adminProcedure
    .input(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ input }) => {
      const totalSales = await getTotalSales(input.startDate, input.endDate);
      const totalOrders = await getTotalOrders(input.startDate, input.endDate);

      return {
        totalSales,
        totalOrders,
        averageOrderValue: totalOrders > 0 ? totalSales / totalOrders : 0,
      };
    }),

  inventory: adminProcedure.query(async () => {
    const lowStockProducts = await getLowStockProducts(10);

    return {
      lowStockProducts,
      totalLowStock: lowStockProducts.length,
    };
  }),
});

import { z } from "zod";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "../_core/trpc";
import {
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  logInventoryChange,
  getProductInventoryLogs,
} from "../db";

export const productsRouter = router({
  // ============================================================================
  // CATEGORY PROCEDURES
  // ============================================================================

  categories: router({
    list: publicProcedure.query(async () => {
      return await getCategories();
    }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getCategoryById(input.id);
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await getCategoryBySlug(input.slug);
      }),

    create: adminProcedure
      .input(
        z.object({
          name: z.string().min(1),
          description: z.string().optional().nullable(),
          slug: z.string().min(1),
          imageUrl: z.string().url().optional().nullable(),
        })
      )
      .mutation(async ({ input }) => {
        return await createCategory({
          name: input.name,
          description: input.description ?? null,
          slug: input.slug,
          imageUrl: input.imageUrl ?? null,
          isActive: true,
        });
      }),
  }),

  // ============================================================================
  // PRODUCT PROCEDURES
  // ============================================================================

  products: router({
    list: publicProcedure
      .input(
        z.object({
          limit: z.number().int().min(1).max(100).default(20),
          offset: z.number().int().min(0).default(0),
          categoryId: z.number().optional(),
          search: z.string().optional(),
        })
      )
      .query(async ({ input }) => {
        return await getProducts(
          input.limit,
          input.offset,
          input.categoryId,
          input.search
        );
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getProductById(input.id);
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await getProductBySlug(input.slug);
      }),

    create: adminProcedure
      .input(
        z.object({
          categoryId: z.number(),
          name: z.string().min(1),
          description: z.string().optional().nullable(),
          slug: z.string().min(1),
          price: z.number().int().positive(),
          originalPrice: z.number().int().positive().optional().nullable(),
          imageUrl: z.string().url().optional().nullable(),
          images: z.string().optional().nullable(),
          stock: z.number().int().min(0).default(0),
          sku: z.string().optional().nullable(),
        })
      )
      .mutation(async ({ input }) => {
        const result = await createProduct({
          categoryId: input.categoryId,
          name: input.name,
          slug: input.slug,
          price: input.price,
          stock: input.stock,
          isActive: true,
          description: input.description ?? null,
          originalPrice: input.originalPrice ?? null,
          imageUrl: input.imageUrl ?? null,
          images: input.images ?? null,
          sku: input.sku ?? null,
        });

        // Log initial stock
        if (input.stock > 0) {
          const productId = (result as any).insertId as number;
          await logInventoryChange({
            productId,
            quantity: input.stock,
            reason: "restock",
            reference: "Initial stock",
            notes: "Initial stock",
          });
        }

        return result;
      }),

    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          categoryId: z.number().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          slug: z.string().optional(),
          price: z.number().int().positive().optional(),
          originalPrice: z.number().int().positive().optional(),
          imageUrl: z.string().url().optional(),
          images: z.string().optional(),
          stock: z.number().int().optional(),
          sku: z.string().optional(),
          isActive: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...updateData } = input;

        // Get current product to track stock changes
        const currentProduct = await getProductById(id);
        if (!currentProduct) {
          throw new Error("Product not found");
        }

        // Log stock change if stock is being updated
        if (updateData.stock !== undefined && updateData.stock !== currentProduct.stock) {
          const quantityChange = updateData.stock - currentProduct.stock;
          await logInventoryChange({
            productId: id,
            quantity: quantityChange,
            reason: quantityChange > 0 ? "restock" : "adjustment",
            reference: `Product update`,
            notes: `Stock adjusted from ${currentProduct.stock} to ${updateData.stock}`,
          });
        }

        const cleanUpdateData: any = {};
        Object.entries(updateData).forEach(([key, value]) => {
          cleanUpdateData[key] = value === undefined ? null : value;
        });

        return await updateProduct(id, cleanUpdateData);
      }),

    inventoryLogs: adminProcedure
      .input(z.object({ productId: z.number(), limit: z.number().default(50) }))
      .query(async ({ input }) => {
        return await getProductInventoryLogs(input.productId, input.limit);
      }),
  }),
});

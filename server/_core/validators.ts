import { z } from "zod";

/**
 * Common validators for the application
 */

// Email validation
export const emailValidator = z
  .string()
  .email("Email inválido")
  .max(320, "Email muito longo");

// Password validation (minimum 8 characters, at least one uppercase, one lowercase, one number)
export const passwordValidator = z
  .string()
  .min(8, "Senha deve ter no mínimo 8 caracteres")
  .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
  .regex(/[0-9]/, "Senha deve conter pelo menos um número");

// Phone validation (Brazilian format)
export const phoneValidator = z
  .string()
  .regex(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, "Telefone inválido")
  .optional();

// ZIP code validation (Brazilian format)
export const zipCodeValidator = z
  .string()
  .regex(/^\d{5}-?\d{3}$/, "CEP inválido");

// Brazilian state code
export const stateValidator = z
  .string()
  .length(2, "Estado deve ter 2 caracteres")
  .toUpperCase();

// Pagination validators
export const paginationValidator = z.object({
  limit: z.number().int().min(1).max(100).default(20),
  offset: z.number().int().min(0).default(0),
});

// Price validator (in cents)
export const priceValidator = z
  .number()
  .int()
  .min(0, "Preço não pode ser negativo");

// Product name validator
export const productNameValidator = z
  .string()
  .min(3, "Nome do produto deve ter no mínimo 3 caracteres")
  .max(255, "Nome do produto muito longo");

// Product description validator
export const productDescriptionValidator = z
  .string()
  .max(2000, "Descrição muito longa")
  .optional();

// SKU validator
export const skuValidator = z
  .string()
  .regex(/^[A-Z0-9-]{3,100}$/, "SKU inválido")
  .optional();

// Slug validator
export const slugValidator = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido");

// URL validator
export const urlValidator = z
  .string()
  .url("URL inválida")
  .optional()
  .nullable();

// Order status validator
export const orderStatusValidator = z.enum([
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);

// Payment method validator
export const paymentMethodValidator = z.enum([
  "credit_card",
  "debit_card",
  "pix",
  "boleto",
  "paypal",
]);

// Payment status validator
export const paymentStatusValidator = z.enum([
  "pending",
  "completed",
  "failed",
  "refunded",
]);

// User role validator
export const roleValidator = z.enum(["user", "admin"]);

// Address validator
export const addressValidator = z.object({
  street: z
    .string()
    .min(3, "Rua inválida")
    .max(255),
  number: z
    .string()
    .min(1, "Número inválido")
    .max(20),
  complement: z
    .string()
    .max(255)
    .optional(),
  city: z
    .string()
    .min(2, "Cidade inválida")
    .max(100),
  state: stateValidator,
  zipCode: zipCodeValidator,
});

// Shipping address validator
export const shippingAddressValidator = z.object({
  address: z
    .string()
    .min(5, "Endereço inválido")
    .max(255),
  city: z
    .string()
    .min(2, "Cidade inválida")
    .max(100),
  state: stateValidator,
  zipCode: zipCodeValidator,
});

/**
 * Sanitize input string
 */
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .substring(0, 1000); // Limit length
}

/**
 * Validate and sanitize email
 */
export function validateAndSanitizeEmail(email: string): string {
  const sanitized = sanitizeString(email).toLowerCase();
  return emailValidator.parse(sanitized);
}

/**
 * Validate pagination parameters
 */
export function validatePagination(limit?: number, offset?: number) {
  return paginationValidator.parse({ limit, offset });
}

/**
 * Create a reusable validator for list queries
 */
export const listQueryValidator = z.object({
  limit: z.number().int().min(1).max(100).default(20),
  offset: z.number().int().min(0).default(0),
  search: z.string().max(100).optional(),
});

/**
 * Validate date range
 */
export const dateRangeValidator = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

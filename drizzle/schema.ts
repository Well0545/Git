import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  decimal,
  boolean,
  index,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extended with e-commerce specific fields.
 */
export const users = mysqlTable(
  "users",
  {
    id: int("id").autoincrement().primaryKey(),
    openId: varchar("openId", { length: 64 }).notNull().unique(),
    name: text("name"),
    email: varchar("email", { length: 320 }).unique(),
    loginMethod: varchar("loginMethod", { length: 64 }),
    role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
    
    // E-commerce fields
    phone: varchar("phone", { length: 20 }),
    address: text("address"),
    city: varchar("city", { length: 100 }),
    state: varchar("state", { length: 2 }),
    zipCode: varchar("zipCode", { length: 20 }),
    country: varchar("country", { length: 100 }).default("Brazil"),
    
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
    lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index("email_idx").on(table.email),
    openIdIdx: index("openId_idx").on(table.openId),
  })
);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Product categories table.
 */
export const categories = mysqlTable(
  "categories",
  {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    description: text("description"),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    imageUrl: text("imageUrl"),
    isActive: boolean("isActive").default(true).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    slugIdx: index("slug_idx").on(table.slug),
  })
);

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

/**
 * Products table with inventory tracking.
 */
export const products = mysqlTable(
  "products",
  {
    id: int("id").autoincrement().primaryKey(),
    categoryId: int("categoryId").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    price: int("price").notNull(), // Store in cents to avoid decimal issues
    originalPrice: int("originalPrice"), // For discounts
    imageUrl: text("imageUrl"),
    images: text("images"), // JSON array of image URLs
    stock: int("stock").notNull().default(0),
    sku: varchar("sku", { length: 100 }).unique(),
    isActive: boolean("isActive").default(true).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    categoryIdIdx: index("categoryId_idx").on(table.categoryId),
    slugIdx: index("slug_idx").on(table.slug),
    skuIdx: index("sku_idx").on(table.sku),
  })
);

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * Shopping cart items.
 */
export const cartItems = mysqlTable(
  "cartItems",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    productId: int("productId").notNull(),
    quantity: int("quantity").notNull().default(1),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("userId_idx").on(table.userId),
    productIdIdx: index("productId_idx").on(table.productId),
  })
);

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = typeof cartItems.$inferInsert;

/**
 * Orders table.
 */
export const orders = mysqlTable(
  "orders",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    orderNumber: varchar("orderNumber", { length: 50 }).notNull().unique(),
    status: mysqlEnum("status", ["pending", "processing", "shipped", "delivered", "cancelled"]).default("pending").notNull(),
    totalAmount: int("totalAmount").notNull(), // in cents
    shippingCost: int("shippingCost").default(0),
    discount: int("discount").default(0),
    
    // Shipping info
    shippingAddress: text("shippingAddress").notNull(),
    shippingCity: varchar("shippingCity", { length: 100 }).notNull(),
    shippingState: varchar("shippingState", { length: 2 }).notNull(),
    shippingZipCode: varchar("shippingZipCode", { length: 20 }).notNull(),
    
    // Tracking
    trackingNumber: varchar("trackingNumber", { length: 100 }),
    estimatedDelivery: timestamp("estimatedDelivery"),
    
    notes: text("notes"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("userId_idx").on(table.userId),
    orderNumberIdx: index("orderNumber_idx").on(table.orderNumber),
    statusIdx: index("status_idx").on(table.status),
  })
);

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Order items (line items in an order).
 */
export const orderItems = mysqlTable(
  "orderItems",
  {
    id: int("id").autoincrement().primaryKey(),
    orderId: int("orderId").notNull(),
    productId: int("productId").notNull(),
    quantity: int("quantity").notNull(),
    price: int("price").notNull(), // Price at time of purchase (in cents)
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => ({
    orderIdIdx: index("orderId_idx").on(table.orderId),
    productIdIdx: index("productId_idx").on(table.productId),
  })
);

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

/**
 * Payment records.
 */
export const payments = mysqlTable(
  "payments",
  {
    id: int("id").autoincrement().primaryKey(),
    orderId: int("orderId").notNull().unique(),
    userId: int("userId").notNull(),
    amount: int("amount").notNull(), // in cents
    currency: varchar("currency", { length: 3 }).default("BRL").notNull(),
    status: mysqlEnum("status", ["pending", "completed", "failed", "refunded"]).default("pending").notNull(),
    method: mysqlEnum("method", ["credit_card", "debit_card", "pix", "boleto", "paypal"]).notNull(),
    
    // Payment gateway info
    transactionId: varchar("transactionId", { length: 255 }),
    paymentGateway: varchar("paymentGateway", { length: 50 }), // stripe, paypal, etc
    
    // Metadata
    metadata: text("metadata"), // JSON for additional info
    
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    orderIdIdx: index("orderId_idx").on(table.orderId),
    userIdIdx: index("userId_idx").on(table.userId),
    statusIdx: index("status_idx").on(table.status),
  })
);

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

/**
 * Inventory log for tracking stock changes.
 */
export const inventoryLogs = mysqlTable(
  "inventoryLogs",
  {
    id: int("id").autoincrement().primaryKey(),
    productId: int("productId").notNull(),
    quantity: int("quantity").notNull(), // Change in quantity (can be negative)
    reason: mysqlEnum("reason", ["purchase", "return", "adjustment", "restock", "damage"]).notNull(),
    reference: varchar("reference", { length: 100 }), // Order ID or other reference
    notes: text("notes"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => ({
    productIdIdx: index("productId_idx").on(table.productId),
    reasonIdx: index("reason_idx").on(table.reason),
  })
);

export type InventoryLog = typeof inventoryLogs.$inferSelect;
export type InsertInventoryLog = typeof inventoryLogs.$inferInsert;

/**
 * Application constants and configuration
 */

// ============================================================================
// API CONFIGURATION
// ============================================================================

export const API_CONFIG = {
  // Rate limiting
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100, // requests per window
  },

  // Pagination
  PAGINATION: {
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
    MIN_LIMIT: 1,
  },

  // Timeouts
  TIMEOUT: {
    DB_QUERY: 30000, // 30 seconds
    EXTERNAL_API: 10000, // 10 seconds
  },
};

// ============================================================================
// BUSINESS LOGIC CONSTANTS
// ============================================================================

export const BUSINESS_CONFIG = {
  // Product
  PRODUCT: {
    MIN_PRICE: 0,
    MAX_PRICE: 999999999, // 9,999,999.99 in cents
    MIN_STOCK: 0,
    MAX_STOCK: 999999,
    LOW_STOCK_THRESHOLD: 10,
  },

  // Order
  ORDER: {
    MIN_ITEMS: 1,
    MAX_ITEMS: 1000,
    STATUSES: ["pending", "processing", "shipped", "delivered", "cancelled"],
    CANCELLABLE_STATUSES: ["pending"],
  },

  // Payment
  PAYMENT: {
    METHODS: ["credit_card", "debit_card", "pix", "boleto", "paypal"],
    STATUSES: ["pending", "completed", "failed", "refunded"],
    TIMEOUT_MINUTES: 30,
  },

  // Shipping
  SHIPPING: {
    MIN_COST: 0,
    MAX_COST: 99999999, // 999,999.99 in cents
  },

  // Discount
  DISCOUNT: {
    MIN: 0,
    MAX: 100, // percentage
  },
};

// ============================================================================
// SECURITY CONSTANTS
// ============================================================================

export const SECURITY_CONFIG = {
  // Password
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    HASH_ROUNDS: 10,
  },

  // JWT
  JWT: {
    EXPIRATION: "7d",
    REFRESH_EXPIRATION: "30d",
  },

  // Session
  SESSION: {
    MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 7 days
    SECURE: process.env.NODE_ENV === "production",
    HTTP_ONLY: true,
    SAME_SITE: "strict" as const,
  },

  // CORS
  CORS: {
    CREDENTIALS: true,
    MAX_AGE: 3600,
  },
};

// ============================================================================
// ERROR CODES
// ============================================================================

export const ERROR_CODES = {
  // Validation errors
  INVALID_INPUT: "INVALID_INPUT",
  MISSING_REQUIRED_FIELD: "MISSING_REQUIRED_FIELD",
  INVALID_EMAIL: "INVALID_EMAIL",
  INVALID_PASSWORD: "INVALID_PASSWORD",

  // Authentication errors
  UNAUTHORIZED: "UNAUTHORIZED",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  TOKEN_INVALID: "TOKEN_INVALID",

  // Authorization errors
  FORBIDDEN: "FORBIDDEN",
  INSUFFICIENT_PERMISSIONS: "INSUFFICIENT_PERMISSIONS",

  // Resource errors
  NOT_FOUND: "NOT_FOUND",
  RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",
  DUPLICATE_RESOURCE: "DUPLICATE_RESOURCE",

  // Business logic errors
  INSUFFICIENT_STOCK: "INSUFFICIENT_STOCK",
  INVALID_ORDER_STATUS: "INVALID_ORDER_STATUS",
  CART_EMPTY: "CART_EMPTY",
  PAYMENT_FAILED: "PAYMENT_FAILED",

  // System errors
  INTERNAL_ERROR: "INTERNAL_ERROR",
  DATABASE_ERROR: "DATABASE_ERROR",
  EXTERNAL_SERVICE_ERROR: "EXTERNAL_SERVICE_ERROR",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
};

// ============================================================================
// SUCCESS MESSAGES
// ============================================================================

export const SUCCESS_MESSAGES = {
  PRODUCT_CREATED: "Produto criado com sucesso",
  PRODUCT_UPDATED: "Produto atualizado com sucesso",
  PRODUCT_DELETED: "Produto deletado com sucesso",
  CATEGORY_CREATED: "Categoria criada com sucesso",
  CATEGORY_UPDATED: "Categoria atualizada com sucesso",
  ORDER_CREATED: "Pedido criado com sucesso",
  ORDER_CANCELLED: "Pedido cancelado com sucesso",
  PAYMENT_PROCESSED: "Pagamento processado com sucesso",
  CART_ITEM_ADDED: "Produto adicionado ao carrinho",
  CART_ITEM_REMOVED: "Produto removido do carrinho",
};

// ============================================================================
// ERROR MESSAGES
// ============================================================================

export const ERROR_MESSAGES = {
  // Validation
  INVALID_INPUT: "Entrada inválida",
  MISSING_FIELD: "Campo obrigatório não fornecido",
  INVALID_EMAIL: "Email inválido",
  INVALID_PASSWORD: "Senha inválida",

  // Authentication
  UNAUTHORIZED: "Autenticação necessária",
  INVALID_CREDENTIALS: "Credenciais inválidas",
  TOKEN_EXPIRED: "Token expirado",

  // Authorization
  FORBIDDEN: "Acesso negado",
  ADMIN_ONLY: "Apenas administradores podem acessar",

  // Resources
  NOT_FOUND: "Recurso não encontrado",
  PRODUCT_NOT_FOUND: "Produto não encontrado",
  ORDER_NOT_FOUND: "Pedido não encontrado",
  CATEGORY_NOT_FOUND: "Categoria não encontrada",
  USER_NOT_FOUND: "Usuário não encontrado",
  DUPLICATE_EMAIL: "Email já registrado",
  DUPLICATE_SKU: "SKU já existe",

  // Business logic
  INSUFFICIENT_STOCK: "Estoque insuficiente",
  CART_EMPTY: "Carrinho vazio",
  INVALID_ORDER_STATUS: "Status de pedido inválido",
  CANNOT_CANCEL_ORDER: "Pedido não pode ser cancelado",
  PAYMENT_FAILED: "Falha no processamento do pagamento",

  // System
  INTERNAL_ERROR: "Erro interno do servidor",
  DATABASE_ERROR: "Erro na operação de banco de dados",
  EXTERNAL_SERVICE_ERROR: "Serviço externo indisponível",
  RATE_LIMIT_EXCEEDED: "Muitas requisições, tente novamente mais tarde",
};

// ============================================================================
// EMAIL TEMPLATES
// ============================================================================

export const EMAIL_TEMPLATES = {
  ORDER_CONFIRMATION: "order_confirmation",
  ORDER_SHIPPED: "order_shipped",
  ORDER_DELIVERED: "order_delivered",
  PAYMENT_CONFIRMATION: "payment_confirmation",
  PASSWORD_RESET: "password_reset",
  WELCOME: "welcome",
};

// ============================================================================
// FEATURE FLAGS
// ============================================================================

export const FEATURE_FLAGS = {
  ENABLE_STRIPE: process.env.STRIPE_SECRET_KEY ? true : false,
  ENABLE_PAYPAL: process.env.PAYPAL_CLIENT_ID ? true : false,
  ENABLE_EMAIL_NOTIFICATIONS: process.env.SMTP_HOST ? true : false,
  ENABLE_SMS_NOTIFICATIONS: process.env.TWILIO_ACCOUNT_SID ? true : false,
  MAINTENANCE_MODE: process.env.MAINTENANCE_MODE === "true",
};

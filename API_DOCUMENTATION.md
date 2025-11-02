# JB Eletronic - Documentação da API

## Visão Geral

A API do JB Eletronic é construída com **tRPC** e **Express.js**, fornecendo endpoints type-safe para todas as operações de e-commerce.

**Base URL:** `https://api.jbeletronic.com/api/trpc`

**Autenticação:** JWT via cookies (Manus OAuth)

---

## Estrutura de Resposta

Todas as respostas seguem o padrão tRPC:

```json
{
  "result": {
    "data": { /* dados da resposta */ }
  }
}
```

Em caso de erro:

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Autenticação necessária",
    "data": {
      "code": "UNAUTHORIZED"
    }
  }
}
```

---

## Routers Disponíveis

### 1. Auth Router (`auth.*`)

Gerencia autenticação e sessão do usuário.

#### `auth.me` (Query)
Retorna dados do usuário autenticado.

```typescript
// Request
trpc.auth.me.useQuery()

// Response
{
  id: number
  openId: string
  name: string | null
  email: string | null
  role: "user" | "admin"
  createdAt: Date
}
```

#### `auth.logout` (Mutation)
Faz logout do usuário.

```typescript
// Request
trpc.auth.logout.useMutation()

// Response
{ success: true }
```

---

### 2. Products Router (`products.*`)

Gerencia produtos e categorias.

#### `products.categories.list` (Query)
Lista todas as categorias.

```typescript
// Response
[
  {
    id: number
    name: string
    slug: string
    description: string | null
    imageUrl: string | null
    isActive: boolean
  }
]
```

#### `products.products.list` (Query)
Lista produtos com filtros.

```typescript
// Input
{
  limit: number (1-100, default: 20)
  offset: number (default: 0)
  categoryId?: number
  search?: string
}

// Response
[
  {
    id: number
    name: string
    slug: string
    price: number (em centavos)
    originalPrice?: number
    description: string | null
    imageUrl: string | null
    stock: number
    sku: string | null
    isActive: boolean
  }
]
```

#### `products.products.getBySlug` (Query)
Obtém detalhes de um produto pelo slug.

```typescript
// Input
{ slug: string }

// Response
{
  id: number
  name: string
  slug: string
  price: number
  description: string | null
  imageUrl: string | null
  stock: number
  categoryId: number
  // ... outros campos
}
```

#### `products.products.create` (Mutation - Admin)
Cria um novo produto.

```typescript
// Input
{
  categoryId: number
  name: string
  description?: string
  slug: string
  price: number
  originalPrice?: number
  imageUrl?: string
  stock: number
  sku?: string
}

// Response
{ id: number, /* ... produto criado */ }
```

---

### 3. Cart Router (`cart.*`)

Gerencia carrinho de compras.

#### `cart.list` (Query - Protegido)
Lista itens do carrinho do usuário.

```typescript
// Response
[
  {
    id: number
    userId: number
    productId: number
    quantity: number
    product: {
      id: number
      name: string
      price: number
      imageUrl: string | null
    }
  }
]
```

#### `cart.add` (Mutation - Protegido)
Adiciona produto ao carrinho.

```typescript
// Input
{
  productId: number
  quantity: number (mín: 1)
}

// Response
{ id: number, /* ... item criado */ }
```

#### `cart.update` (Mutation - Protegido)
Atualiza quantidade de item no carrinho.

```typescript
// Input
{
  cartItemId: number
  quantity: number (mín: 0)
}

// Response
{ /* ... item atualizado */ }
```

#### `cart.remove` (Mutation - Protegido)
Remove item do carrinho.

```typescript
// Input
{ cartItemId: number }

// Response
{ success: true }
```

---

### 4. Orders Router (`orders.*`)

Gerencia pedidos.

#### `orders.list` (Query - Protegido)
Lista pedidos do usuário.

```typescript
// Input
{
  limit: number (1-100, default: 20)
  offset: number (default: 0)
}

// Response
[
  {
    id: number
    orderNumber: string
    userId: number
    totalAmount: number
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
    shippingAddress: string
    shippingCity: string
    shippingState: string
    shippingZipCode: string
    createdAt: Date
  }
]
```

#### `orders.getById` (Query - Protegido)
Obtém detalhes de um pedido.

```typescript
// Input
{ id: number }

// Response
{
  id: number
  orderNumber: string
  totalAmount: number
  status: string
  items: [
    {
      id: number
      productId: number
      quantity: number
      price: number
    }
  ]
  // ... outros campos
}
```

#### `orders.create` (Mutation - Protegido)
Cria um novo pedido a partir do carrinho.

```typescript
// Input
{
  shippingAddress: string
  shippingCity: string
  shippingState: string (2 caracteres)
  shippingZipCode: string
  shippingCost?: number (default: 0)
  discount?: number (default: 0)
  notes?: string
}

// Response
{
  orderId: number
  orderNumber: string
  totalAmount: number
}
```

#### `orders.cancel` (Mutation - Protegido)
Cancela um pedido (apenas se status = "pending").

```typescript
// Input
{ orderId: number }

// Response
{ success: true }
```

---

### 5. Payments Router (`payments.*`)

Gerencia pagamentos.

#### `payments.create` (Mutation - Protegido)
Cria um registro de pagamento.

```typescript
// Input
{
  orderId: number
  method: "credit_card" | "debit_card" | "pix" | "boleto" | "paypal"
}

// Response
{
  id: number
  orderId: number
  amount: number
  status: "pending"
  method: string
}
```

#### `payments.getByOrderId` (Query - Protegido)
Obtém pagamento de um pedido.

```typescript
// Input
{ orderId: number }

// Response
{
  id: number
  orderId: number
  amount: number
  status: "pending" | "completed" | "failed" | "refunded"
  method: string
}
```

#### `payments.webhook` (Mutation - Público)
Webhook para confirmação de pagamento (Stripe, PayPal, etc).

```typescript
// Input
{
  orderId: number
  transactionId: string
  status: "completed" | "failed" | "refunded"
  gateway: string
  metadata?: string
}

// Response
{ success: true }
```

---

### 6. Admin Router (`admin.*`)

Gerencia operações administrativas (requer role = "admin").

#### `admin.dashboard` (Query - Admin)
Retorna estatísticas do dashboard.

```typescript
// Input
{
  startDate?: Date
  endDate?: Date
}

// Response
{
  totalSales: number (em centavos)
  totalOrders: number
  averageOrderValue: number
  lowStockProducts: [
    {
      id: number
      name: string
      stock: number
      price: number
    }
  ]
}
```

#### `admin.sales` (Query - Admin)
Retorna estatísticas de vendas.

```typescript
// Response
{
  totalSales: number
  totalOrders: number
  averageOrderValue: number
}
```

#### `admin.inventory` (Query - Admin)
Retorna status de inventário.

```typescript
// Response
{
  lowStockProducts: [...]
  totalLowStock: number
}
```

---

## Códigos de Erro

| Código | Status HTTP | Descrição |
|--------|------------|-----------|
| `UNAUTHORIZED` | 401 | Autenticação necessária |
| `FORBIDDEN` | 403 | Acesso negado |
| `NOT_FOUND` | 404 | Recurso não encontrado |
| `VALIDATION_ERROR` | 400 | Dados inválidos |
| `INSUFFICIENT_STOCK` | 422 | Estoque insuficiente |
| `CART_EMPTY` | 422 | Carrinho vazio |
| `DUPLICATE_RESOURCE` | 409 | Recurso já existe |
| `RATE_LIMIT_EXCEEDED` | 429 | Muitas requisições |
| `INTERNAL_ERROR` | 500 | Erro interno |

---

## Autenticação

A autenticação é realizada via **Manus OAuth** com tokens JWT armazenados em cookies HTTP-only.

**Fluxo:**
1. Usuário clica em "Login"
2. Redireciona para portal Manus OAuth
3. Após autenticação, cookie de sessão é criado
4. Requisições subsequentes incluem o cookie automaticamente

**Headers necessários:**
```
Cookie: session=<jwt_token>
```

---

## Rate Limiting

- **Limite:** 100 requisições por 15 minutos
- **Header de resposta:** `X-RateLimit-Remaining`
- **Erro:** 429 Too Many Requests

---

## Boas Práticas

1. **Sempre validar entrada** - Use os validadores fornecidos
2. **Tratar erros** - Implemente tratamento de erro no cliente
3. **Usar paginação** - Para listas grandes, use `limit` e `offset`
4. **Cache** - Implemente cache no cliente para queries frequentes
5. **Logging** - Registre erros e eventos importantes

---

## Exemplos de Uso

### React com tRPC

```typescript
import { trpc } from "@/lib/trpc";

function ProductList() {
  const { data: products, isLoading } = trpc.products.products.list.useQuery({
    limit: 20,
    offset: 0,
  });

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div>
      {products?.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Criar Pedido

```typescript
const { mutate: createOrder } = trpc.orders.create.useMutation({
  onSuccess: (data) => {
    console.log("Pedido criado:", data.orderNumber);
  },
});

createOrder({
  shippingAddress: "Rua A, 123",
  shippingCity: "São Paulo",
  shippingState: "SP",
  shippingZipCode: "01234-567",
});
```

---

## Suporte

Para dúvidas ou problemas, entre em contato com o time de desenvolvimento.

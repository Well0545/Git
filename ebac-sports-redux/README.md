# EBAC Sports - Redux Toolkit

Este projeto demonstra a migração de um gerenciamento de estado baseado em `useState` para **Redux Toolkit**, implementando todas as funcionalidades solicitadas.

## 🚀 Funcionalidades Implementadas

### ✅ Redux Toolkit
- Configuração completa do Redux Toolkit
- Store configurado com middleware personalizado

### ✅ Slice do Carrinho
- **Arquivo**: `src/store/slices/cartSlice.js`
- **Actions implementadas**:
  - `addToCart` - Adiciona produto ao carrinho
  - `removeFromCart` - Remove produto do carrinho
  - `decreaseQuantity` - Diminui quantidade do produto
  - `clearCart` - Limpa todo o carrinho
  - `toggleCart` - Alterna visibilidade do carrinho
  - `openCart` / `closeCart` - Controla abertura/fechamento

### ✅ Redux Toolkit Query (RTK Query)
- **Arquivo**: `src/store/api/productsApi.js`
- **Endpoints implementados**:
  - `getProducts` - Busca todos os produtos
  - `getProductById` - Busca produto por ID
  - `getProductsByCategory` - Busca produtos por categoria
  - `getCategories` - Busca todas as categorias
- **Cache automático** e **invalidação de tags**

### ✅ useSelector
Utilizado em todos os componentes para acessar o estado:
```javascript
const { items, totalQuantity, totalPrice, isOpen } = useSelector((state) => state.cart)
```

### ✅ useDispatch
Utilizado para disparar actions:
```javascript
const dispatch = useDispatch()
dispatch(addToCart(product))
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Cart.jsx           # Componente do carrinho
│   ├── Header.jsx         # Cabeçalho com contador
│   ├── ProductCard.jsx    # Card do produto
│   └── ProductList.jsx    # Lista de produtos
├── store/
│   ├── slices/
│   │   └── cartSlice.js   # Slice do carrinho
│   ├── api/
│   │   └── productsApi.js # RTK Query API
│   └── index.js           # Configuração do store
├── hooks/
│   └── redux.js           # Hooks personalizados
├── App.jsx                # Componente principal
└── main.jsx               # Provider do Redux
```

## 🛠️ Tecnologias Utilizadas

- **React 19.1.0**
- **Redux Toolkit 2.8.2**
- **React-Redux 9.2.0**
- **Tailwind CSS** (para estilização)
- **shadcn/ui** (componentes UI)
- **Lucide React** (ícones)
- **Vite** (bundler)

## 🎯 Demonstração das Funcionalidades

### 1. **useSelector em ação**
- O componente `Header` usa `useSelector` para mostrar a quantidade de itens
- O componente `Cart` usa `useSelector` para acessar todos os dados do carrinho

### 2. **useDispatch em ação**
- Botões "Adicionar ao Carrinho" disparam `addToCart`
- Botões de quantidade disparam `decreaseQuantity` e `addToCart`
- Botão "Limpar Carrinho" dispara `clearCart`

### 3. **Redux Toolkit Query**
- Lista de produtos carregada automaticamente da API
- Cache inteligente e revalidação automática
- Loading states e error handling

### 4. **Slice do Carrinho**
- Estado imutável gerenciado pelo Redux Toolkit
- Actions síncronas para todas as operações do carrinho
- Cálculos automáticos de totais

## 🚀 Como Executar

```bash
# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm run dev

# Build para produção
pnpm run build
```

## 📊 Estado do Redux

O estado global é estruturado da seguinte forma:

```javascript
{
  cart: {
    items: [],           // Array de produtos no carrinho
    totalQuantity: 0,    // Quantidade total de itens
    totalPrice: 0,       // Preço total
    isOpen: false        // Visibilidade do carrinho
  },
  productsApi: {
    // Cache automático do RTK Query
  }
}
```

## 🎨 Interface

- **Design responsivo** com Tailwind CSS
- **Componentes acessíveis** com shadcn/ui
- **Feedback visual** para todas as ações
- **Modal do carrinho** com funcionalidades completas

---

Este projeto demonstra uma implementação completa e profissional do Redux Toolkit, seguindo as melhores práticas e padrões recomendados pela comunidade React/Redux.


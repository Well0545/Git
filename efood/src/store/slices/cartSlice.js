import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  isOpen: false,
  currentRestaurant: null, // Para garantir que só adicione itens do mesmo restaurante
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { dish, restaurant } = action.payload
      
      // Se o carrinho está vazio ou é do mesmo restaurante
      if (!state.currentRestaurant || state.currentRestaurant.id === restaurant.id) {
        state.currentRestaurant = restaurant
        
        const existingItem = state.items.find(item => item.id === dish.id)
        
        if (existingItem) {
          existingItem.quantity += 1
          existingItem.totalPrice += dish.preco
        } else {
          state.items.push({
            id: dish.id,
            nome: dish.nome,
            preco: dish.preco,
            quantity: 1,
            totalPrice: dish.preco,
            foto: dish.foto,
            descricao: dish.descricao,
            porcao: dish.porcao,
          })
        }
        
        state.totalQuantity += 1
        state.totalAmount += dish.preco
      }
    },
    
    removeFromCart: (state, action) => {
      const id = action.payload
      const existingItem = state.items.find(item => item.id === id)
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity
        state.totalAmount -= existingItem.totalPrice
        state.items = state.items.filter(item => item.id !== id)
        
        // Se o carrinho ficou vazio, limpa o restaurante atual
        if (state.items.length === 0) {
          state.currentRestaurant = null
        }
      }
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const existingItem = state.items.find(item => item.id === id)
      
      if (existingItem && quantity > 0) {
        const quantityDifference = quantity - existingItem.quantity
        const priceDifference = quantityDifference * existingItem.preco
        
        existingItem.quantity = quantity
        existingItem.totalPrice = existingItem.preco * quantity
        
        state.totalQuantity += quantityDifference
        state.totalAmount += priceDifference
      }
    },
    
    decreaseQuantity: (state, action) => {
      const id = action.payload
      const existingItem = state.items.find(item => item.id === id)
      
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1
        existingItem.totalPrice -= existingItem.preco
        state.totalQuantity -= 1
        state.totalAmount -= existingItem.preco
      }
    },
    
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalAmount = 0
      state.currentRestaurant = null
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    
    setCartOpen: (state, action) => {
      state.isOpen = action.payload
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  decreaseQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
} = cartSlice.actions

export default cartSlice.reducer

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity
export const selectCartTotalAmount = (state) => state.cart.totalAmount
export const selectCartIsOpen = (state) => state.cart.isOpen
export const selectCurrentRestaurant = (state) => state.cart.currentRestaurant
export const selectCartItemById = (id) => (state) => 
  state.cart.items.find(item => item.id === id)


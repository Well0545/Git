import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  isOpen: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload
      const existingItem = state.items.find(item => item.id === newItem.id)
      
      if (existingItem) {
        existingItem.quantity += 1
        existingItem.totalPrice += newItem.price
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price
        })
      }
      
      state.totalQuantity += 1
      state.totalPrice += newItem.price
    },
    
    removeFromCart: (state, action) => {
      const id = action.payload
      const existingItem = state.items.find(item => item.id === id)
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity
        state.totalPrice -= existingItem.totalPrice
        state.items = state.items.filter(item => item.id !== id)
      }
    },
    
    decreaseQuantity: (state, action) => {
      const id = action.payload
      const existingItem = state.items.find(item => item.id === id)
      
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1
        existingItem.totalPrice -= existingItem.price
        state.totalQuantity -= 1
        state.totalPrice -= existingItem.price
      } else if (existingItem && existingItem.quantity === 1) {
        state.totalQuantity -= 1
        state.totalPrice -= existingItem.price
        state.items = state.items.filter(item => item.id !== id)
      }
    },
    
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalPrice = 0
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    
    openCart: (state) => {
      state.isOpen = true
    },
    
    closeCart: (state) => {
      state.isOpen = false
    }
  }
})

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart
} = cartSlice.actions

export default cartSlice.reducer


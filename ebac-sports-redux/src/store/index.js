import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import { productsApi } from './api/productsApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware)
})


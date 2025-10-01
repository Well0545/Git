import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './reducers/Cart'
import api from '../services/api'
export type RootState = ReturnType<typeof store.getState>
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [api.reducerPath]: api.reducer // ✅ add the API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware) // ✅ add the API middleware
})

export type RootReducer = ReturnType<typeof store.getState>

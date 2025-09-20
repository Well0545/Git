import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import cartSlice from './slices/cartSlice'
import { efoodApi } from './api/efoodApi'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    [efoodApi.reducerPath]: efoodApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(efoodApi.middleware),
})

// Habilita listeners para refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch)

export const RootState = store.getState
export const AppDispatch = store.dispatch


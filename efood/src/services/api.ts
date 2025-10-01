import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import Cardapio from '../models/Cardapio'
import Checkout from '../models/Checkout'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ebac-fake-api.vercel.app/api/efood'
  }),
  endpoints: (builder) => ({
    getCardapio: builder.query<Cardapio[], void>({
      query: () => `/restaurantes`
    }),

    getRestaurante: builder.query<Cardapio, string>({
      query: (id) => `/restaurantes/${id}`
    }),

    purchase: builder.mutation<any, Checkout>({
      query: (body) => ({
        url: 'checkout',
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useGetCardapioQuery,
  useGetRestauranteQuery,
  usePurchaseMutation
} = api

export default api

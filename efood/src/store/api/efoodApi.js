import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const efoodApi = createApi({
  reducerPath: 'efoodApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ebac-fake-api.vercel.app/api/efood',
    prepareHeaders: (headers) => {
      headers.set('content-type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Restaurant', 'Dish'],
  endpoints: (builder) => ({
    // Buscar todos os restaurantes
    getRestaurants: builder.query({
      query: () => '/restaurantes',
      providesTags: ['Restaurant'],
    }),

    // Buscar restaurante por ID
    getRestaurantById: builder.query({
      query: (id) => `/restaurantes/${id}`,
      providesTags: (result, error, id) => [{ type: 'Restaurant', id }],
    }),

    // Buscar pratos de um restaurante específico
    getRestaurantDishes: builder.query({
      query: (restaurantId) => `/restaurantes/${restaurantId}`,
      transformResponse: (response) => response.cardapio || [],
      providesTags: (result, error, restaurantId) => [
        { type: 'Dish', id: restaurantId }
      ],
    }),
  }),
})

// Export hooks para uso nos componentes
export const {
  useGetRestaurantsQuery,
  useGetRestaurantByIdQuery,
  useGetRestaurantDishesQuery,
} = efoodApi


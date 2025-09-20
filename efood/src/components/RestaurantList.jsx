import { useGetRestaurantsQuery } from '../store/api/efoodApi'
import RestaurantCard from './RestaurantCard'
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function RestaurantList({ onRestaurantSelect }) {
  const {
    data: restaurants,
    error,
    isLoading,
    refetch
  } = useGetRestaurantsQuery()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 md:py-24">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-red-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Carregando restaurantes...
            </h3>
            <p className="text-gray-500 text-sm">
              Estamos buscando os melhores restaurantes para você
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16 md:py-24">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <AlertCircle className="h-12 w-12 mx-auto text-red-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Ops! Algo deu errado
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Não foi possível carregar os restaurantes. Verifique sua conexão e tente novamente.
            </p>
            <Button 
              onClick={() => refetch()}
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar novamente
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-gray-50 py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Restaurantes
          </h2>
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Descubra sabores únicos e experiências gastronômicas incríveis
          </p>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {restaurants?.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onSaibaMais={onRestaurantSelect}
            />
          ))}
        </div>

        {/* Empty State */}
        {restaurants && restaurants.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Nenhum restaurante encontrado
            </h3>
            <p className="text-gray-500 text-sm">
              Tente novamente mais tarde
            </p>
          </div>
        )}
      </div>
    </section>
  )
}


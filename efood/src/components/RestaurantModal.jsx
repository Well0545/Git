import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { X, ArrowLeft, Star } from 'lucide-react'
import { useGetRestaurantByIdQuery } from '../store/api/efoodApi'
import { addToCart, selectCurrentRestaurant } from '../store/slices/cartSlice'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import DishCard from './DishCard'
import DishModal from './DishModal'

export default function RestaurantModal({ restaurant, isOpen, onClose }) {
  const dispatch = useDispatch()
  const currentRestaurant = useSelector(selectCurrentRestaurant)
  const [selectedDish, setSelectedDish] = useState(null)
  const [isDishModalOpen, setIsDishModalOpen] = useState(false)

  const {
    data: restaurantData,
    isLoading,
    error
  } = useGetRestaurantByIdQuery(restaurant?.id, {
    skip: !restaurant?.id
  })

  const handleAddToCart = (dish) => {
    // Verifica se é do mesmo restaurante ou se o carrinho está vazio
    if (!currentRestaurant || currentRestaurant.id === restaurant.id) {
      dispatch(addToCart({ dish, restaurant }))
    } else {
      // Abre modal de confirmação se for de restaurante diferente
      alert(`Você já tem itens de ${currentRestaurant.titulo} no carrinho. Deseja limpar o carrinho e adicionar itens de ${restaurant.titulo}?`)
    }
  }

  const handleDishClick = (dish) => {
    setSelectedDish(dish)
    setIsDishModalOpen(true)
  }

  if (!restaurant) return null

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto p-0">
          {/* Header do restaurante */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
            >
              <X className="h-4 w-4" />
            </Button>
            
            <img 
              src={restaurant.capa} 
              alt={restaurant.titulo}
              className="w-full h-48 md:h-64 lg:h-80 object-cover"
            />
            
            {/* Overlay com informações */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
              <div className="p-4 md:p-6 text-white w-full">
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3">
                  {restaurant.destacado && (
                    <Badge className="bg-red-500 text-white text-xs md:text-sm font-semibold">
                      Destaque da semana
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-red-500 text-white capitalize text-xs md:text-sm font-semibold">
                    {restaurant.tipo}
                  </Badge>
                </div>
                
                <DialogTitle className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3">
                  {restaurant.titulo}
                </DialogTitle>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-sm md:text-base">{restaurant.avaliacao}</span>
                  </div>
                </div>
                
                <p className="text-gray-200 text-base md:text-lg max-w-4xl leading-relaxed">
                  {restaurant.descricao}
                </p>
              </div>
            </div>
          </div>

          {/* Conteúdo do cardápio */}
          <div className="p-4 md:p-6">
            <div className="mb-6 md:mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-red-600 mb-2">Cardápio</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Clique em um prato para ver mais detalhes e adicionar ao carrinho
              </p>
            </div>
            
            {isLoading && (
              <div className="text-center py-12 md:py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Carregando cardápio...</p>
              </div>
            )}
            
            {error && (
              <div className="text-center py-12 md:py-16">
                <p className="text-red-600 mb-2">Erro ao carregar cardápio</p>
                <p className="text-gray-500 text-sm">Tente novamente mais tarde</p>
              </div>
            )}
            
            {restaurantData?.cardapio && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {restaurantData.cardapio.map((dish) => (
                  <div key={dish.id} className="cursor-pointer" onClick={() => handleDishClick(dish)}>
                    <DishCard
                      dish={dish}
                      onAddToCart={(e) => {
                        e.stopPropagation()
                        handleAddToCart(dish)
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {restaurantData?.cardapio && restaurantData.cardapio.length === 0 && (
              <div className="text-center py-12 md:py-16">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Cardápio em breve
                </h3>
                <p className="text-gray-500 text-sm">
                  Este restaurante ainda não possui pratos cadastrados
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal do prato */}
      <DishModal
        dish={selectedDish}
        restaurant={restaurant}
        isOpen={isDishModalOpen}
        onClose={() => setIsDishModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </>
  )
}


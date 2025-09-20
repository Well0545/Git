import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { X, Plus, Minus } from 'lucide-react'
import { addToCart, selectCurrentRestaurant, clearCart } from '../store/slices/cartSlice'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function DishModal({ dish, restaurant, isOpen, onClose, onAddToCart }) {
  const dispatch = useDispatch()
  const currentRestaurant = useSelector(selectCurrentRestaurant)
  const [quantity, setQuantity] = useState(1)
  const [showRestaurantAlert, setShowRestaurantAlert] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    // Verifica se é do mesmo restaurante ou se o carrinho está vazio
    if (!currentRestaurant || currentRestaurant.id === restaurant.id) {
      // Adiciona a quantidade especificada
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart({ dish, restaurant }))
      }
      onClose()
      setQuantity(1)
    } else {
      // Mostra alerta se for de restaurante diferente
      setShowRestaurantAlert(true)
    }
  }

  const handleClearAndAdd = () => {
    dispatch(clearCart())
    // Adiciona a quantidade especificada
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart({ dish, restaurant }))
    }
    setShowRestaurantAlert(false)
    onClose()
    setQuantity(1)
  }

  const handleClose = () => {
    onClose()
    setQuantity(1)
    setShowRestaurantAlert(false)
  }

  if (!dish) return null

  const totalPrice = dish.preco * quantity

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="absolute top-4 right-4 z-10"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Imagem do prato */}
          <div className="relative">
            <img 
              src={dish.foto} 
              alt={dish.nome}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Informações do prato */}
          <div className="space-y-4">
            <DialogTitle className="text-3xl font-extrabold text-red-600 mb-2">
              {dish.nome}
            </DialogTitle>
            
            <DialogDescription className="text-gray-700 text-base leading-relaxed">
              {dish.descricao}
            </DialogDescription>
            
            {dish.porcao && (
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Porção:</span> {dish.porcao}
              </p>
            )}

            <div className="text-2xl font-bold text-red-600">
              {formatPrice(dish.preco)}
            </div>
          </div>

          {/* Alerta de restaurante diferente */}
          {showRestaurantAlert && (
            <Alert className="border-yellow-400 bg-yellow-50">
              <AlertDescription>
                Você já tem itens de <strong>{currentRestaurant.titulo}</strong> no carrinho. 
                Deseja limpar o carrinho e adicionar itens de <strong>{restaurant.titulo}</strong>?
                <div className="flex gap-2 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowRestaurantAlert(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleClearAndAdd}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Sim, limpar carrinho
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Controles de quantidade e botão de adicionar */}
            <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4">
              <span className="font-bold text-lg">Quantidade:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-extrabold text-lg">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button 
              onClick={handleAddToCart}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg font-semibold shadow-md hover:shadow-lg"
              disabled={showRestaurantAlert}
            >
              Adicionar {formatPrice(totalPrice)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


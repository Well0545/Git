import { useSelector, useDispatch } from 'react-redux'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
  selectCartIsOpen,
  selectCurrentRestaurant,
  removeFromCart,
  updateQuantity,
  decreaseQuantity,
  clearCart,
  setCartOpen
} from '../store/slices/cartSlice'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export default function Cart({ onCheckout }) {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const totalAmount = useSelector(selectCartTotalAmount)
  const totalQuantity = useSelector(selectCartTotalQuantity)
  const isOpen = useSelector(selectCartIsOpen)
  const currentRestaurant = useSelector(selectCurrentRestaurant)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(id))
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    }
  }

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout()
    }
    dispatch(setCartOpen(false))
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => dispatch(setCartOpen(open))}>
      <SheetContent side="right" className="w-full sm:w-96 p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-3 text-red-600 text-xl font-extrabold">
            <ShoppingBag className="h-6 w-6" />
            Seu Carrinho
            {totalQuantity > 0 && (
              <span className="bg-red-500 text-white text-sm px-2.5 py-1 rounded-full font-bold">
                {totalQuantity}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
            <div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Carrinho vazio
              </h3>
              <p className="text-gray-500 text-sm">
                Adicione itens do cardápio para começar seu pedido
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Informações do restaurante */}
            {currentRestaurant && (
              <div className="bg-red-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-gray-600">Pedido de:</p>
                <p className="font-semibold text-red-600">{currentRestaurant.titulo}</p>
              </div>
            )}

            {/* Lista de itens */}
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white border rounded-lg p-4 shadow-sm">
                    <div className="flex gap-3">
                      {/* Imagem do item */}
                      <img
                        src={item.foto}
                        alt={item.nome}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      
                      {/* Informações do item */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-base truncate">
                          {item.nome}
                        </h4>
                        <p className="text-sm text-gray-700 line-clamp-2 mt-1">
                          {item.descricao}
                        </p>
                        <p className="font-bold text-red-600 text-lg mt-2">
                          {formatPrice(item.totalPrice)}
                        </p>
                      </div>

                      {/* Botão remover */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500 flex-shrink-0 h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Controles de quantidade */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="h-7 w-7"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="h-7 w-7"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <p className="text-sm text-gray-600">
                        {formatPrice(item.preco)} cada
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer com total e ações */}
            <div className="border-t pt-4 space-y-4">
              {/* Botão limpar carrinho */}
              <Button
                onClick={handleClearCart}
                className="w-full bg-red-100 text-red-600 hover:bg-red-200 font-semibold py-2.5 transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar carrinho
              </Button>

              <Separator />

              {/* Total */}
              <div className="space-y-2">
                <div className="flex justify-between text-base text-gray-700">
                  <span>Subtotal ({totalQuantity} {totalQuantity === 1 ? 'item' : 'itens'})</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-xl font-extrabold text-red-600">
                  <span>Total</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
              </div>

              {/* Botão finalizar pedido */}
              <Button 
                onClick={handleCheckout}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-base font-semibold"
                size="lg"
                disabled={cartItems.length === 0}
              >
                Continuar com a entrega
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}


import { useSelector, useDispatch } from 'react-redux'
import { 
  removeFromCart, 
  decreaseQuantity, 
  addToCart, 
  clearCart, 
  closeCart 
} from '../store/slices/cartSlice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'

const Cart = () => {
  const dispatch = useDispatch()
  const { items, totalQuantity, totalPrice, isOpen } = useSelector((state) => state.cart)

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id))
  }

  const handleIncreaseQuantity = (item) => {
    dispatch(addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image
    }))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const handleCloseCart = () => {
    dispatch(closeCart())
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Carrinho de Compras
            <Badge variant="secondary">{totalQuantity} itens</Badge>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCloseCart}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="overflow-y-auto max-h-96">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Seu carrinho está vazio</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium line-clamp-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${item.price} cada
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleIncreaseQuantity(item)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${item.totalPrice.toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        
        {items.length > 0 && (
          <>
            <Separator />
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  className="flex-1"
                >
                  Limpar Carrinho
                </Button>
                <Button className="flex-1">
                  Finalizar Compra
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}

export default Cart


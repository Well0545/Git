import { useSelector, useDispatch } from 'react-redux'
import { toggleCart } from '../store/slices/cartSlice'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Store } from 'lucide-react'

const Header = () => {
  const dispatch = useDispatch()
  const { totalQuantity } = useSelector((state) => state.cart)

  const handleToggleCart = () => {
    dispatch(toggleCart())
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Store className="h-6 w-6" />
          <h1 className="text-xl font-bold">EBAC Sports</h1>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleToggleCart}
          className="relative"
        >
          <ShoppingCart className="h-4 w-4" />
          {totalQuantity > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {totalQuantity}
            </Badge>
          )}
          <span className="ml-2 hidden sm:inline">Carrinho</span>
        </Button>
      </div>
    </header>
  )
}

export default Header


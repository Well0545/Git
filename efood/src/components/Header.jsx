import { ShoppingCart, Menu } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartTotalQuantity, toggleCart } from '../store/slices/cartSlice'
import { Button } from '@/components/ui/button'

export default function Header() {
  const dispatch = useDispatch()
  const cartQuantity = useSelector(selectCartTotalQuantity)

  const handleCartClick = () => {
    dispatch(toggleCart())
  }

  return (
    <header className="bg-gradient-to-r from-red-600 to-red-500 text-white">
      {/* Navigation Bar */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-3xl md:text-4xl font-extrabold">
              eFood
            </h1>
          </div>

          {/* Cart Button */}
          <Button
            variant="outline"
            onClick={handleCartClick}
            className="bg-white text-red-500 hover:bg-gray-100 relative border-white px-4 py-2 rounded-full shadow-md"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline font-semibold">
              {cartQuantity} produto{cartQuantity !== 1 ? 's' : ''} no carrinho
            </span>
            <span className="sm:hidden font-semibold">
              {cartQuantity}
            </span>
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold border-2 border-white">
                {cartQuantity}
              </span>
            )}
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6">
            Viva experiências gastronômicas
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            no conforto da sua casa
          </p>
          
          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-yellow-400 text-red-600 hover:bg-yellow-300 font-semibold px-8 py-3 text-lg"
          >
            Explorar Restaurantes
          </Button>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white bg-opacity-5 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-400 bg-opacity-20 rounded-full"></div>
        </div>
      </div>
    </header>
  )
}


import { useDispatch } from 'react-redux'
import { addToCart } from '../store/slices/cartSlice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart } from 'lucide-react'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    }))
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="aspect-square overflow-hidden rounded-md">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </div>
        <CardTitle className="line-clamp-2">{product.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">${product.price}</span>
          <span className="text-sm text-muted-foreground">
            ⭐ {product.rating?.rate} ({product.rating?.count})
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleAddToCart} 
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard


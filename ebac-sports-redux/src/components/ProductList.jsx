import { useGetProductsQuery } from '../store/api/productsApi'
import ProductCard from './ProductCard'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

const ProductList = () => {
  const { data: products, error, isLoading } = useGetProductsQuery()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Carregando produtos...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-red-500">Erro ao carregar produtos</p>
            <p className="text-sm text-muted-foreground mt-2">
              {error.message || 'Tente novamente mais tarde'}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container py-8">
      <h2 className="text-2xl font-bold mb-6">Produtos em Destaque</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductList


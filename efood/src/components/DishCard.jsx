import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function DishCard({ dish, onAddToCart }) {
  const {
    id,
    nome,
    descricao,
    preco,
    foto,
    porcao
  } = dish

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group h-full flex flex-col">
      {/* Imagem do prato */}
      <div className="relative overflow-hidden">
        <img 
          src={foto} 
          alt={nome}
          className="w-full h-48 sm:h-56 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
          {formatPrice(preco)}
        </div>
      </div>

      <CardHeader className="pb-3 flex-grow">
        <CardTitle className="text-xl md:text-2xl font-bold text-red-600 line-clamp-2 leading-tight mb-2">
          {nome}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
        <div className="space-y-3">
          <CardDescription className="text-gray-700 text-base md:text-lg line-clamp-3 leading-relaxed">
            {descricao}
          </CardDescription>
          
          {porcao && (
            <Badge variant="outline" className="text-xs">
              <span className="font-semibold">Serve:</span> {porcao}
            </Badge>
          )}
        </div>
        
        <div className="pt-4 border-t">
          <Button 
            onClick={() => onAddToCart(dish)}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Adicionar ao carrinho
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


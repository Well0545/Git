import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function RestaurantCard({ restaurant, onSaibaMais }) {
  const {
    id,
    titulo,
    destacado,
    tipo,
    avaliacao,
    descricao,
    capa
  } = restaurant

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Imagem do restaurante */}
      <div className="relative overflow-hidden">
        <img 
          src={capa} 
          alt={titulo}
          className="w-full h-48 sm:h-56 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {destacado && (
            <Badge className="bg-red-500 text-white text-xs font-semibold shadow-lg">
              Destaque da semana
            </Badge>
          )}
          <Badge variant="secondary" className="bg-red-500 text-white capitalize text-xs font-semibold shadow-lg">
            {tipo}
          </Badge>
        </div>

        {/* Rating overlay */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="font-bold text-xs text-gray-800">{avaliacao}</span>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-xl md:text-2xl font-bold text-red-600 line-clamp-1 mb-2">
          {titulo}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-gray-700 text-base md:text-lg line-clamp-3 leading-relaxed">
          {descricao}
        </CardDescription>
        
          <Button 
            onClick={() => onSaibaMais(restaurant)}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Saiba mais
        </Button>
      </CardContent>
    </Card>
  )
}


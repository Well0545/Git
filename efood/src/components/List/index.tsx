import { Container } from '../../styles'
import Restaurant from '../Restaurants'
import { List } from './styles'
import type { TagInfo } from '../Restaurants'
import type { Restaurants } from '../../pages/Home'

type Props = {
  restaurants: Restaurants[]
}
const RestaurantList = ({ restaurants }: Props) => {
  const getRestaurantTags = (
    restaurant: Restaurants
  ): { text: string; size: 'big' | 'small' }[] => {
    const tags: { text: string; size: 'big' | 'small' }[] = []

    if (restaurant.destacado) {
      tags.push({ text: 'Destaque do dia', size: 'big' })
    }

    if (restaurant.tipo) {
      tags.push({ text: restaurant.tipo, size: 'small' })
    }

    return tags
  }
  return (
    <Container>
      <List>
        {restaurants.map((restaurants) => (
          <Restaurant
            key={restaurants.id}
            id={restaurants.id}
            classification={restaurants.avaliacao}
            description={restaurants.descricao}
            image={restaurants.capa}
            infos={getRestaurantTags(restaurants)}
            title={restaurants.titulo}
          />
        ))}
      </List>
    </Container>
  )
}
export default RestaurantList

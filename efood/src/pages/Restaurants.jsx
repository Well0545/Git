import React, { useState } from 'react';
import styled from 'styled-components';
import RestaurantCard from '../components/RestaurantCard';
import food1 from '../assets/food1.jpg';
import food2 from '../assets/food2.jpg';
import restaurant1 from '../assets/restaurant1.jpg';
import restaurant2 from '../assets/restaurant2.jpg';
import food3 from '../assets/food3.jpg';

const Container = styled.div`
  min-height: 100vh;
  background: #f7fafc;
  padding: 2rem 0;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #718096;
  max-width: 600px;
  margin: 0 auto;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.active ? '#e53e3e' : '#e2e8f0'};
  background: ${props => props.active ? '#e53e3e' : 'white'};
  color: ${props => props.active ? 'white' : '#2d3748'};
  border-radius: 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #e53e3e;
    background: ${props => props.active ? '#e53e3e' : '#fed7d7'};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Restaurants = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const restaurants = [
    {
      id: 1,
      name: "Bistrô Gourmet",
      description: "Culinária francesa contemporânea com ingredientes frescos e sazonais. Uma experiência gastronômica única.",
      image: restaurant1,
      category: "Francesa",
      rating: 4.8,
      deliveryTime: "30-45 min"
    },
    {
      id: 2,
      name: "Sabores do Chef",
      description: "Pratos autorais criados por chefs renomados. Fusão de sabores tradicionais com técnicas modernas.",
      image: restaurant2,
      category: "Contemporânea",
      rating: 4.9,
      deliveryTime: "25-40 min"
    },
    {
      id: 3,
      name: "Casa da Pasta",
      description: "Massas artesanais feitas diariamente com receitas tradicionais italianas passadas de geração em geração.",
      image: food1,
      category: "Italiana",
      rating: 4.7,
      deliveryTime: "35-50 min"
    },
    {
      id: 4,
      name: "Grill Premium",
      description: "Carnes nobres grelhadas na perfeição. Ambiente sofisticado para os amantes da boa gastronomia.",
      image: food2,
      category: "Steakhouse",
      rating: 4.9,
      deliveryTime: "40-55 min"
    },
    {
      id: 5,
      name: "Fusion Oriental",
      description: "Combinação perfeita entre sabores asiáticos e técnicas culinárias ocidentais em pratos únicos.",
      image: food3,
      category: "Asiática",
      rating: 4.6,
      deliveryTime: "30-45 min"
    },
    {
      id: 6,
      name: "Pizzaria Artesanal",
      description: "Pizzas com massa fermentada naturalmente e ingredientes importados diretamente da Itália.",
      image: food1,
      category: "Italiana",
      rating: 4.5,
      deliveryTime: "25-35 min"
    },
    {
      id: 7,
      name: "Sushi Master",
      description: "Sushi e sashimi preparados por mestres sushimen com peixes frescos e arroz temperado na tradição japonesa.",
      image: food3,
      category: "Asiática",
      rating: 4.8,
      deliveryTime: "30-40 min"
    },
    {
      id: 8,
      name: "Brasserie Moderne",
      description: "Ambiente descontraído com pratos clássicos franceses revisitados com um toque contemporâneo.",
      image: restaurant1,
      category: "Francesa",
      rating: 4.6,
      deliveryTime: "35-50 min"
    }
  ];

  const categories = ['Todos', 'Francesa', 'Italiana', 'Asiática', 'Contemporânea', 'Steakhouse'];

  const filteredRestaurants = activeFilter === 'Todos' 
    ? restaurants 
    : restaurants.filter(restaurant => restaurant.category === activeFilter);

  return (
    <Container>
      <Content>
        <Header>
          <Title>Nossos Restaurantes</Title>
          <Subtitle>
            Explore nossa seleção cuidadosa de restaurantes parceiros e descubra sabores únicos
          </Subtitle>
        </Header>

        <FilterSection>
          {categories.map(category => (
            <FilterButton
              key={category}
              active={activeFilter === category}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </FilterButton>
          ))}
        </FilterSection>

        <Grid>
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </Grid>
      </Content>
    </Container>
  );
};

export default Restaurants;


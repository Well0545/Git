import React from 'react';
import styled from 'styled-components';
import Hero from '../components/Hero';
import RestaurantCard from '../components/RestaurantCard';
import food1 from '../assets/food1.jpg';
import food2 from '../assets/food2.jpg';
import restaurant1 from '../assets/restaurant1.jpg';
import restaurant2 from '../assets/restaurant2.jpg';
import food3 from '../assets/food3.jpg';

const Container = styled.div`
  min-height: 100vh;
  background: #f7fafc;
`;

const Section = styled.section`
  padding: 4rem 0;
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #2d3748;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Home = () => {
  const featuredRestaurants = [
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
    }
  ];

  return (
    <Container>
      <Hero />
      <Section>
        <SectionContent>
          <SectionTitle>Restaurantes em Destaque</SectionTitle>
          <Grid>
            {featuredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </Grid>
        </SectionContent>
      </Section>
    </Container>
  );
};

export default Home;


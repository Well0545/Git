import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import FoodCard from '../components/FoodCard';
import food1 from '../assets/food1.jpg';
import food2 from '../assets/food2.jpg';
import food3 from '../assets/food3.jpg';
import restaurant1 from '../assets/restaurant1.jpg';

const Container = styled.div`
  min-height: 100vh;
  background: #f7fafc;
`;

const HeroSection = styled.div`
  height: 400px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${restaurant1});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 1rem;
`;

const RestaurantName = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const RestaurantDescription = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

const MenuSection = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const RestaurantDetail = () => {
  const { id } = useParams();
  const [cart, setCart] = useState([]);

  const restaurant = {
    id: 1,
    name: "Bistrô Gourmet",
    description: "Culinária francesa contemporânea com ingredientes frescos e sazonais",
    rating: 4.8,
    deliveryTime: "30-45 min",
    category: "Francesa"
  };

  const menuItems = [
    {
      id: 1,
      name: "Salmão Grelhado",
      description: "Salmão fresco grelhado com molho de ervas finas, acompanhado de legumes salteados e purê de batata-doce.",
      price: 45.90,
      image: food1,
      category: "Pratos Principais"
    },
    {
      id: 2,
      name: "Cordeiro ao Molho de Vinho",
      description: "Cordeiro assado lentamente com molho de vinho tinto, servido com batatas confitadas e ratatouille.",
      price: 65.90,
      image: food2,
      category: "Pratos Principais"
    },
    {
      id: 3,
      name: "Risotto de Cogumelos",
      description: "Risotto cremoso com mix de cogumelos selvagens, finalizado com parmesão envelhecido e trufa negra.",
      price: 38.90,
      image: food3,
      category: "Pratos Principais"
    },
    {
      id: 4,
      name: "Foie Gras",
      description: "Foie gras selado com compota de figos e torrada artesanal, uma entrada sofisticada e inesquecível.",
      price: 55.90,
      image: food1,
      category: "Entradas"
    },
    {
      id: 5,
      name: "Tarte Tatin",
      description: "Clássica torta francesa de maçã caramelizada, servida com sorvete de baunilha e calda de caramelo.",
      price: 28.90,
      image: food2,
      category: "Sobremesas"
    },
    {
      id: 6,
      name: "Crème Brûlée",
      description: "Sobremesa tradicional francesa com creme de baunilha e açúcar queimado, textura cremosa e sabor único.",
      price: 24.90,
      image: food3,
      category: "Sobremesas"
    }
  ];

  const addToCart = (item) => {
    setCart(prev => [...prev, item]);
    // Aqui você pode adicionar uma notificação ou feedback visual
    alert(`${item.name} adicionado ao carrinho!`);
  };

  const categories = [...new Set(menuItems.map(item => item.category))];

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <RestaurantName>{restaurant.name}</RestaurantName>
          <RestaurantDescription>{restaurant.description}</RestaurantDescription>
          <InfoRow>
            <InfoItem>
              ⭐ {restaurant.rating}
            </InfoItem>
            <InfoItem>
              🕒 {restaurant.deliveryTime}
            </InfoItem>
            <InfoItem>
              🍽️ {restaurant.category}
            </InfoItem>
          </InfoRow>
        </HeroContent>
      </HeroSection>

      <Content>
        {categories.map(category => (
          <MenuSection key={category}>
            <SectionTitle>{category}</SectionTitle>
            <Grid>
              {menuItems
                .filter(item => item.category === category)
                .map(item => (
                  <FoodCard 
                    key={item.id} 
                    food={item} 
                    onAddToCart={addToCart}
                  />
                ))}
            </Grid>
          </MenuSection>
        ))}
      </Content>
    </Container>
  );
};

export default RestaurantDetail;


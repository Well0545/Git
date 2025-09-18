import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 180px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #718096;
  font-size: 0.85rem;
  line-height: 1.4;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Price = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: #e53e3e;
`;

const Button = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #e53e3e 0%, #d53f8c 100%);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(229, 62, 62, 0.4);
  }
`;

const FoodCard = ({ food, onAddToCart }) => {
  return (
    <Card>
      <ImageContainer>
        <Image src={food.image} alt={food.name} />
      </ImageContainer>
      <Content>
        <Title>{food.name}</Title>
        <Description>{food.description}</Description>
        <PriceRow>
          <Price>R$ {food.price.toFixed(2)}</Price>
        </PriceRow>
        <Button onClick={() => onAddToCart(food)}>
          Adicionar ao Carrinho
        </Button>
      </Content>
    </Card>
  );
};

export default FoodCard;


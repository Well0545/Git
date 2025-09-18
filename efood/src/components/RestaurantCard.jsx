import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
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

const Badge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #e53e3e 0%, #d53f8c 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 600;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #718096;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Rating = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #f6ad55;
  font-weight: 600;
`;

const DeliveryTime = styled.span`
  color: #718096;
  font-size: 0.9rem;
`;

const Button = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, #e53e3e 0%, #d53f8c 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(229, 62, 62, 0.4);
  }
`;

const RestaurantCard = ({ restaurant }) => {
  return (
    <Card>
      <ImageContainer>
        <Image src={restaurant.image} alt={restaurant.name} />
        {restaurant.category && <Badge>{restaurant.category}</Badge>}
      </ImageContainer>
      <Content>
        <Title>{restaurant.name}</Title>
        <Description>{restaurant.description}</Description>
        <InfoRow>
          <Rating>
            ⭐ {restaurant.rating}
          </Rating>
          <DeliveryTime>{restaurant.deliveryTime}</DeliveryTime>
        </InfoRow>
        <Button to={`/restaurante/${restaurant.id}`}>
          Ver Cardápio
        </Button>
      </Content>
    </Card>
  );
};

export default RestaurantCard;


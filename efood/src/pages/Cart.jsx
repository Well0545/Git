import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background: #f7fafc;
  padding: 2rem 0;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const CartContainer = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem;
  color: #718096;
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyCartText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const ShopButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, #e53e3e 0%, #d53f8c 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(229, 62, 62, 0.4);
  }
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.p`
  color: #e53e3e;
  font-weight: 600;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #e53e3e;
    background: #fed7d7;
  }
`;

const Quantity = styled.span`
  font-weight: 600;
  min-width: 20px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: #fed7d7;
  color: #e53e3e;
  border: none;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #feb2b2;
  }
`;

const Summary = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: ${props => props.total ? '1.2rem' : '1rem'};
  font-weight: ${props => props.total ? '700' : '400'};
  color: ${props => props.total ? '#2d3748' : '#718096'};
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #e53e3e 0%, #d53f8c 100%);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(229, 62, 62, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Salmão Grelhado",
      price: 45.90,
      quantity: 1,
      image: "/src/assets/food1.jpg"
    },
    {
      id: 2,
      name: "Cordeiro ao Molho de Vinho",
      price: 65.90,
      quantity: 2,
      image: "/src/assets/food2.jpg"
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = cartItems.length > 0 ? 8.90 : 0;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <Container>
        <Content>
          <Header>
            <Title>Seu Carrinho</Title>
          </Header>
          <CartContainer>
            <EmptyCart>
              <EmptyCartIcon>🛒</EmptyCartIcon>
              <EmptyCartText>Seu carrinho está vazio</EmptyCartText>
              <ShopButton to="/restaurantes">
                Explorar Restaurantes
              </ShopButton>
            </EmptyCart>
          </CartContainer>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Header>
          <Title>Seu Carrinho</Title>
        </Header>

        <CartContainer>
          {cartItems.map(item => (
            <CartItem key={item.id}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>R$ {item.price.toFixed(2)}</ItemPrice>
              </ItemInfo>
              <QuantityControls>
                <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  -
                </QuantityButton>
                <Quantity>{item.quantity}</Quantity>
                <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </QuantityButton>
                <RemoveButton onClick={() => removeItem(item.id)}>
                  🗑️
                </RemoveButton>
              </QuantityControls>
            </CartItem>
          ))}
        </CartContainer>

        <Summary>
          <SummaryRow>
            <span>Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Taxa de entrega</span>
            <span>R$ {deliveryFee.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow total>
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </SummaryRow>
          <CheckoutButton>
            Finalizar Pedido
          </CheckoutButton>
        </Summary>
      </Content>
    </Container>
  );
};

export default Cart;


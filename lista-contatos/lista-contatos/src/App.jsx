import React from 'react';
import styled from 'styled-components';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.125rem;
  margin: 0;
  font-weight: 300;
`;

const MainContent = styled.main`
  display: grid;
  gap: 2rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 400px 1fr;
    align-items: start;
  }
`;

function App() {
  return (
    <AppContainer>
      <Container>
        <Header>
          <Title>Lista de Contatos</Title>
          <Subtitle>Gerencie seus contatos de forma simples e eficiente</Subtitle>
        </Header>
        
        <MainContent>
          <ContactForm />
          <ContactList />
        </MainContent>
      </Container>
    </AppContainer>
  );
}

export default App;


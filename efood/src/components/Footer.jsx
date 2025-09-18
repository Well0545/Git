import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #e53e3e;
  }

  p, a {
    color: #cbd5e0;
    text-decoration: none;
    line-height: 1.6;
    transition: color 0.3s ease;
  }

  a:hover {
    color: white;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #e53e3e;
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
  text-align: center;
  color: #a0aec0;
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>efood</h3>
            <p>
              Conectando você aos melhores sabores da sua cidade. 
              Delivery de comida gourmet com qualidade e rapidez.
            </p>
            <SocialLinks>
              <SocialLink href="#" aria-label="Facebook">📘</SocialLink>
              <SocialLink href="#" aria-label="Instagram">📷</SocialLink>
              <SocialLink href="#" aria-label="Twitter">🐦</SocialLink>
              <SocialLink href="#" aria-label="WhatsApp">💬</SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Links Rápidos</h3>
            <FooterLinks>
              <Link to="/">Home</Link>
              <Link to="/restaurantes">Restaurantes</Link>
              <Link to="/carrinho">Carrinho</Link>
              <a href="#sobre">Sobre Nós</a>
              <a href="#contato">Contato</a>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Suporte</h3>
            <FooterLinks>
              <a href="#ajuda">Central de Ajuda</a>
              <a href="#termos">Termos de Uso</a>
              <a href="#privacidade">Política de Privacidade</a>
              <a href="#faq">FAQ</a>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Contato</h3>
            <p>📞 (11) 9999-9999</p>
            <p>✉️ contato@efood.com.br</p>
            <p>📍 São Paulo, SP</p>
            <p>🕒 Seg-Dom: 10h às 23h</p>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <p>&copy; 2024 efood. Todos os direitos reservados.</p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;


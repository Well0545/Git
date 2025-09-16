import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ContactItem from './ContactItem';

const ListContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  overflow: hidden;
`;

const ListHeader = styled.div`
  background: #f9fafb;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const ListTitle = styled.h2`
  color: #1f2937;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ContactCount = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: normal;
  margin-left: 0.5rem;
`;

const ListContent = styled.div`
  padding: 1.5rem;
`;

const ContactGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyStateText = styled.p`
  font-size: 1.125rem;
  margin: 0;
`;

const EmptyStateSubtext = styled.p`
  font-size: 0.875rem;
  margin: 0.5rem 0 0 0;
  opacity: 0.7;
`;

const ContactList = () => {
  const contacts = useSelector(state => state.contacts.contacts);

  return (
    <ListContainer>
      <ListHeader>
        <ListTitle>
          Meus Contatos
          <ContactCount>({contacts.length})</ContactCount>
        </ListTitle>
      </ListHeader>
      
      <ListContent>
        {contacts.length === 0 ? (
          <EmptyState>
            <EmptyStateIcon>📱</EmptyStateIcon>
            <EmptyStateText>Nenhum contato encontrado</EmptyStateText>
            <EmptyStateSubtext>
              Adicione seu primeiro contato usando o formulário acima
            </EmptyStateSubtext>
          </EmptyState>
        ) : (
          <ContactGrid>
            {contacts.map(contact => (
              <ContactItem key={contact.id} contact={contact} />
            ))}
          </ContactGrid>
        )}
      </ListContent>
    </ListContainer>
  );
};

export default ContactList;


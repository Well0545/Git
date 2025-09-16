import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { removeContact, setEditingContact } from '../store/contactsSlice';

const ContactCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ContactHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ContactName = styled.h3`
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
`;

const InfoLabel = styled.span`
  font-weight: 500;
  color: #374151;
  min-width: 60px;
`;

const InfoValue = styled.span`
  color: #6b7280;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.75rem;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const EditButton = styled(Button)`
  background: #10b981;
  color: white;

  &:hover {
    background: #059669;
  }
`;

const DeleteButton = styled(Button)`
  background: #ef4444;
  color: white;

  &:hover {
    background: #dc2626;
  }
`;

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setEditingContact(contact));
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este contato?')) {
      dispatch(removeContact(contact.id));
    }
  };

  return (
    <ContactCard>
      <ContactHeader>
        <ContactName>{contact.nomeCompleto}</ContactName>
      </ContactHeader>
      
      <ContactInfo>
        <InfoItem>
          <InfoLabel>E-mail:</InfoLabel>
          <InfoValue>{contact.email}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Telefone:</InfoLabel>
          <InfoValue>{contact.telefone}</InfoValue>
        </InfoItem>
      </ContactInfo>

      <ButtonGroup>
        <EditButton onClick={handleEdit}>
          Editar
        </EditButton>
        <DeleteButton onClick={handleDelete}>
          Excluir
        </DeleteButton>
      </ButtonGroup>
    </ContactCard>
  );
};

export default ContactItem;


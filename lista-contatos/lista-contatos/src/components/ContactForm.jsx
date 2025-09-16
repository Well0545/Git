import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addContact, updateContact, clearEditingContact } from '../store/contactsSlice';

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  border: 1px solid #e5e7eb;
`;

const FormTitle = styled.h2`
  color: #1f2937;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #374151;
  font-weight: 500;
  font-size: 0.875rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:hover {
    border-color: #9ca3af;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PrimaryButton = styled(Button)`
  background: #3b82f6;
  color: white;

  &:hover {
    background: #2563eb;
  }
`;

const SecondaryButton = styled(Button)`
  background: #6b7280;
  color: white;

  &:hover {
    background: #4b5563;
  }
`;

const ContactForm = () => {
  const dispatch = useDispatch();
  const editingContact = useSelector(state => state.contacts.editingContact);
  
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    telefone: '',
  });

  useEffect(() => {
    if (editingContact) {
      setFormData(editingContact);
    } else {
      setFormData({
        nomeCompleto: '',
        email: '',
        telefone: '',
      });
    }
  }, [editingContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nomeCompleto || !formData.email || !formData.telefone) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    if (editingContact) {
      dispatch(updateContact({ id: editingContact.id, ...formData }));
    } else {
      dispatch(addContact(formData));
    }

    setFormData({
      nomeCompleto: '',
      email: '',
      telefone: '',
    });
    dispatch(clearEditingContact());
  };

  const handleCancel = () => {
    setFormData({
      nomeCompleto: '',
      email: '',
      telefone: '',
    });
    dispatch(clearEditingContact());
  };

  return (
    <FormContainer>
      <FormTitle>
        {editingContact ? 'Editar Contato' : 'Adicionar Novo Contato'}
      </FormTitle>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="nomeCompleto">Nome Completo</Label>
          <Input
            type="text"
            id="nomeCompleto"
            name="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={handleChange}
            placeholder="Digite o nome completo"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite o e-mail"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="Digite o telefone"
          />
        </InputGroup>

        <ButtonGroup>
          <PrimaryButton type="submit">
            {editingContact ? 'Atualizar' : 'Adicionar'}
          </PrimaryButton>
          {editingContact && (
            <SecondaryButton type="button" onClick={handleCancel}>
              Cancelar
            </SecondaryButton>
          )}
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default ContactForm;


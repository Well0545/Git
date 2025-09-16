import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  editingContact: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      const newContact = {
        id: Date.now().toString(),
        ...action.payload,
      };
      state.contacts.push(newContact);
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    updateContact: (state, action) => {
      const { id, ...updatedData } = action.payload;
      const index = state.contacts.findIndex(contact => contact.id === id);
      if (index !== -1) {
        state.contacts[index] = { ...state.contacts[index], ...updatedData };
      }
    },
    setEditingContact: (state, action) => {
      state.editingContact = action.payload;
    },
    clearEditingContact: (state) => {
      state.editingContact = null;
    },
  },
});

export const {
  addContact,
  removeContact,
  updateContact,
  setEditingContact,
  clearEditingContact,
} = contactsSlice.actions;

export default contactsSlice.reducer;


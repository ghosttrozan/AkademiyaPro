// src/features/principal/principalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  contact: '',
  // Add any other fields you need for the principal
};

const principalSlice = createSlice({
  name: 'principal',
  initialState,
  reducers: {
    setPrincipal: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.contact = action.payload.contact;
    },
    // Add more actions as needed (e.g., resetPrincipal, updateContact, etc.)
  },
});

export const { setPrincipal } = principalSlice.actions;

export default principalSlice.reducer;

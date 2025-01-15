// src/features/principal/principalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  name: '',
  email: '',
  contactNumber: '',
  gender: '',
  image:'',
  createdAt: null, // Set to null for clarity
};

const principalSlice = createSlice({
  name: 'principal',
  initialState,
  reducers: {
    setPrincipal: (state, action) => {
      const { _id, name, email, contactNumber, gender, createdAt , image } = action.payload;

      // Update fields dynamically or retain current values
      state._id = _id ?? state._id;
      state.name = name ?? state.name;
      state.email = email ?? state.email;
      state.contactNumber = contactNumber ?? state.contactNumber;
      state.gender = gender ?? state.gender;
      state.createdAt = createdAt ?? state.createdAt;
      state.image = image ?? state.image;
    },
    resetPrincipal: (state) => {
      // Reset state to initial state
      Object.assign(state, initialState);
    },
  },
});

export const { setPrincipal, resetPrincipal } = principalSlice.actions;

export default principalSlice.reducer;

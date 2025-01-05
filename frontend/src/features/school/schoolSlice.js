// src/features/school/schoolSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  schoolName: '',
  location: '',
  totalStudents: 0,
  // Add other fields related to the school
};

const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    setSchool: (state, action) => {
      state.schoolName = action.payload.schoolName;
      state.location = action.payload.location;
      state.totalStudents = action.payload.totalStudents;
    },
    // Add more actions as needed
  },
});

export const { setSchool } = schoolSlice.actions;

export default schoolSlice.reducer;

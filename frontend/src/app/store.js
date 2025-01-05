// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import principalReducer from '../features/principal/principalSlice';
import schoolReducer from '../features/school/schoolSlice';

const store = configureStore({
  reducer: {
    principal: principalReducer,
    school: schoolReducer,
  },
});

export default store;

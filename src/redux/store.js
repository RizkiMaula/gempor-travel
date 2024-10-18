import { configureStore } from '@reduxjs/toolkit';
import darkSlice from './slices/darkSlice';

const store = configureStore({
  reducer: {
    darkMode: darkSlice,
  },
});

export default store;

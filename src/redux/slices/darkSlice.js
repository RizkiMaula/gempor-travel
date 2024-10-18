import { createSlice } from '@reduxjs/toolkit';

const initialTheme = () => {
  const localTheme = localStorage.getItem('mode');
  return localTheme || false;
};

const darkSlice = createSlice({
  name: 'dark-mode',
  initialState: {
    darkMode: initialTheme(),
  },
  reducers: {
    darkMode(state, action) {
      state.darkMode = action.payload.darkMode;
      localStorage.setItem('mode', state.darkMode);
    },
    toggleMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem('mode', state.darkMode);
    },
  },
});

export const { darkMode, toggleMode } = darkSlice.actions;
export default darkSlice.reducer;


// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the user
const initialState = {
  user: null, // User information (e.g., email, name)
  isLoggedIn: false, // Track if the user is logged in
  probtopics: []
};

// Create a slice for user authentication
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      // Set the user info and token when the user logs in
      console.log("Login action payload:", action.payload);
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      // Clear user data and set logged in status to false
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('persist:root');
    },
    setUser: (state, action) => {
      // Update user info if necessary
      state.user = action.payload;
    },
    setprobtopics: (state,action)=>{
      state.probtopics = action.payload;
    }
  },
});

export const { login, logout, setUser, setprobtopics } = userSlice.actions;

export default userSlice.reducer;

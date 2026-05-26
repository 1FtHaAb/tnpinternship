import { createSlice } from "@reduxjs/toolkit";

const formData = localStorage.getItem("user");

const initialState = {
  isAuthenticated: formData ? true : false,
  user: formData ? JSON.parse(formData) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("user",JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("results");
    },
  },
});

export const { login, logout } =
  authSlice.actions;

export default authSlice.reducer;
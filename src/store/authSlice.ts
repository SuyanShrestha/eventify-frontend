import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: "unauthenticated",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      state.user = action.payload;
      state.role = action.payload.role || "user";
      state.isAuthenticated = false; // for registered but not logged in yet
    },
    loginAsUser: (state, action) => {
      state.user = action.payload;
      state.role = "user";
      state.isAuthenticated = true;
    },
    loginAsOrganizer: (state, action) => {
      state.user = action.payload;
      state.role = "organizer";
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.role = "unauthenticated";
      state.isAuthenticated = false;
    },
  },
});

export const { register, loginAsUser, loginAsOrganizer, logout } =
  authSlice.actions;
export default authSlice.reducer;

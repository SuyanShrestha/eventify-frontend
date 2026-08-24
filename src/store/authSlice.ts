import { createSlice } from "@reduxjs/toolkit";
import { usersData } from "../constants/data";

interface User {
  id: string;
  username: string;
  password: string;
  role: string;
}

interface AuthState {
  user: User | null;
  role: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  role: "unauthenticated",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const user = usersData.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        state.user = user;
        state.role = user.role;
        state.isAuthenticated = true;
      }
    },
    logout: (state) => {
      state.user = null;
      state.role = "unauthenticated";
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

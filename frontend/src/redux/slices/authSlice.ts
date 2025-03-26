import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, User } from "../../types/auth";

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
}

const initialState: AuthState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null, // ✅ Restore user
  token: localStorage.getItem("token"),
  loading: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setCredentials: (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.loading = false;
      },
      logout: (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        state.loading = false;
      },
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = true;
      },
    },
  });


  export const { setCredentials, logout, setLoading } = authSlice.actions;
  export default authSlice.reducer;

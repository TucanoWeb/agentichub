import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
};

const initialState: AuthState = {
  token: localStorage.getItem('auth_token')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem('auth_token', action.payload);
      } else {
        localStorage.removeItem('auth_token');
      }
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem('auth_token');
    }
  }
});

export const { setToken, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

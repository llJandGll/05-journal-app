import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from './interfaces/AuthState'
import { UserInterface } from '../../interfaces'

const initialState : AuthState = {
  status : 'not-authenticated',
  user : null,
  errorMessage : null,
  successMessage : null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking : ( state ) => {
      state.status = 'checking';
      state.user = null;
      state.errorMessage = null;
    },
    onRegisterSuccess : ( state, action : PayloadAction<string> ) => {
      state.status = 'not-authenticated';
      state.user = null;
      state.errorMessage = null;
      state.successMessage = action.payload;
    },
    
    onLogin : ( state, action : PayloadAction<UserInterface> ) => {
      state.status = 'authenticated';
      state.user = action.payload;
      state.errorMessage = null;
    }, 
    onLogout : ( state, action : PayloadAction<string> ) => {
      state.status = 'not-authenticated';
      state.user = null;
      state.errorMessage = action.payload;
    }
  },
})

export const { onChecking, onLogin, onLogout, onRegisterSuccess } = authSlice.actions
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from './interfaces/AuthState'
import { UserInterface } from '../../interfaces'

const initialState : AuthState = {
  status : 'checking',
  user : null,
  errorMessage : null,
  successMessage : null,
  isRegistering : false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    notAuthenticated : ( state ) => {
      state.status = 'not-authenticated';
      state.user = null;
      state.errorMessage = null;
      state.successMessage = null;
      state.isRegistering = false;
    },
    onChecking : ( state ) => {
      state.status = 'checking';
      state.user = null;
      state.errorMessage = null;
    },
    onLogin : ( state, action : PayloadAction<UserInterface> ) => {
      state.status = 'authenticated';
      state.user = action.payload;
      state.errorMessage = null;
      state.successMessage = 'Logged successfull'
    }, 
    onLogout : ( state, action : PayloadAction<string> ) => {
      state.status = 'not-authenticated';
      state.user = null;
      state.errorMessage = null;
      state.successMessage = action.payload;
      state.isRegistering = false;
    },

    startRegistering : ( state ) => {
      state.isRegistering = true;
    },
    finishRegistering : ( state ) => {
      state.isRegistering = false;
    }
  },
})

export const { onChecking, onLogin, onLogout, startRegistering, finishRegistering, notAuthenticated } = authSlice.actions
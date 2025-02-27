/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginUserWithEmailPassword, logoutAccount, registerUserWithEmailPassword } from "../../firebase/providers";
import { UserInterface } from "../../interfaces";
import { AppDispatch } from "../store";
import { finishRegistering, onChecking, onLogin, onLogout, startRegistering } from "./authSlice";
import { toast } from "sonner";


export const startRegisterUserWithEmailPassword = (user: UserInterface) => {
  const { email, password } = user;
  
  return async (dispatch: AppDispatch) => {
    dispatch(onChecking());
    dispatch(startRegistering());

    if (!email || !password) {
      dispatch(onLogout('Email and password are required'));
      return;
    }
    
    try {
      const { ok, message, errorMessage } = await registerUserWithEmailPassword(user);
      

      if (!ok) {
        toast.error(errorMessage);
        dispatch(onLogout( errorMessage || 'Error al registrar usuario'));
        dispatch(finishRegistering());
        return;
      }

      dispatch(finishRegistering());
      toast.success(message);
      return true;
    } catch (error: any) { 
        console.log('error', error);
        dispatch(onLogout('Error al registrar usuario'));
        dispatch(finishRegistering());
        return false;
    }
  }
}


export const startLoginUserWithEmailPassword = (user: UserInterface) => {
  const { email, password } = user;
  
  return async (dispatch: AppDispatch) => {
    dispatch(onChecking());
    dispatch(startRegistering());

    if (!email || !password) {
      dispatch(onLogout('Email and password are required'));
      return;
    }
    
    try {
      const { ok, message, errorMessage } = await loginUserWithEmailPassword(user);
      

      if (!ok) {
        toast.error(errorMessage);
        dispatch(onLogout( errorMessage || 'Error al registrar usuario'));
        dispatch(finishRegistering());
        return;
      }

      toast.success(message);
      dispatch(finishRegistering());
      dispatch(onLogin(user));
      return true;
    } catch (error: any) { 
        console.log('error', error);
        dispatch(onLogout('Error al registrar usuario'));
        dispatch(finishRegistering());
        return false;
    }
  } 
}


export const startLogout = () => {
  return async ( dispatch : AppDispatch) => {
    await logoutAccount();
    dispatch(onLogout('Exit successfull'))
  }
}
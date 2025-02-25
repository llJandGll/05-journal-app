import { registerUserWithEmailPassword } from "../../firebase/providers";
import { UserInterface } from "../../interfaces";
import { AppDispatch } from "../store";
import { onChecking, onLogout, onRegisterSuccess } from "./authSlice";


export const startRegisterUserWithEmailPassword = (user: UserInterface) => {
  const { email, password } = user;
  
  return async (dispatch: AppDispatch) => {
    dispatch(onChecking());

    if (!email || !password) {
      dispatch(onLogout('Email and password are required'));
      return;
    }
    
    try {
      const result = await registerUserWithEmailPassword(user);
      
      
      if (!result.ok) {
        dispatch(onLogout(result.message || 'Error al registrar usuario'));
        return;
      }

      dispatch(onRegisterSuccess('Usuario registrado correctamente. Por favor, inicie sesión.'));
      
    } catch (error: unknown) { 
      dispatch(onLogout(error instanceof Error ? error.message : 'Error desconocido'));
    }
  }
}
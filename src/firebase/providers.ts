/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { UserInterface } from "../interfaces";
import { FirebaseAuth } from "./config";


export const registerUserWithEmailPassword = async ( { email, password, name } : UserInterface )  => {
  if ( !email || !password || !name ) throw new Error('All fields are required');

  try {

    await createUserWithEmailAndPassword( FirebaseAuth, email, password );

    if (!FirebaseAuth.currentUser) throw new Error('User not found');
    await updateProfile(FirebaseAuth.currentUser, { displayName: name });
    
    await signOut(FirebaseAuth);


    return {
      ok: true, 
      message: 'Cuenta Creada correctamente',
   }
  } catch (error: any) {
    return { 
      ok: false, 
      errorMessage: error.message, 
      errorCode: error.code 
    }
  }

}


export const loginUserWithEmailPassword = async ( { email, password } : UserInterface )  => {
  if ( !email || !password ) throw new Error('All fields are required loginUserWithEmailPassword');

  try {

    const user = await signInWithEmailAndPassword( FirebaseAuth, email, password );

    console.log('user', user);
    if ( !user ) throw new Error('User not found');

    return {
      ok : true,
      message : 'Ingresando...',
    }
  } catch (error : any) {
    return {
      ok : false,
      errorMessage : error.message,
      errorCode : error.code,
    }
  }
}



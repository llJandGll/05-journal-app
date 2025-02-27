/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { UserInterface } from "../interfaces";
import { FirebaseAuth } from "./config";


export const registerUserWithEmailPassword = async ( { email, password, name } : UserInterface )  => {
  if ( !email || !password || !name ) throw new Error('All fields are required');

  try {
    // const originalUnuscribe = onAuthStateChanged(FirebaseAuth, () => {})
    await createUserWithEmailAndPassword( FirebaseAuth, email, password );

    if (!FirebaseAuth.currentUser) throw new Error('User not found');
    await updateProfile(FirebaseAuth.currentUser, { displayName: name });
    
    await signOut(FirebaseAuth);

    // originalUnuscribe();

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

    if ( !user ) throw new Error('User not found');

    return {
      ok : true,
      message : 'Cargando informacion...',
    }
  } catch (error : any) {
    return {
      ok : false,
      errorMessage : error.message,
      errorCode : error.code,
    }
  }
}


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const resp = await signInWithPopup(FirebaseAuth, googleProvider);
    console.log('resp', resp);
    const { displayName, email, photoURL, uid } = resp.user;
    return {
      ok: true,
      message: 'Cargando informacion...',
      displayName,
      email,
      photoURL,
      uid,
    }
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.message,
      errorCode: error.code,
    }
  }
}

export const logoutAccount = async () => {
  await signOut(FirebaseAuth);
}



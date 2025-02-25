/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { UserInterface } from "../interfaces";
import { FirebaseAuth } from "./config";


export const registerUserWithEmailPassword = async ( { email, password, name } : UserInterface )  => {
  if ( !email || !password ) return;

  try {

    await createUserWithEmailAndPassword( FirebaseAuth, email, password );

    if ( !FirebaseAuth.currentUser ) return;

    await updateProfile( FirebaseAuth.currentUser, { displayName: name } );

    FirebaseAuth.signOut();
    return {
      ok : true,
      message : 'Usuario registrado correctamente',
    }
  } catch (error : unknown) {
    return {
      ok : false,
      message : error as string,
    }
  }

}
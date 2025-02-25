import { ErrorMessageAuth } from "../interfaces";

export const LoginValidator : ErrorMessageAuth = {
  name : [ ( name : string ) => null , null ],
  email : [ ( email : string ) => isValidEmail( email ) , 'El correo electrónico no es válido' ],
  password : [ ( password : string ) => password.length >= 6 , 'La contraseña debe tener al menos 6 caracteres' ],
  uid : [ ( ) => null , null ],
  photoURL : [ ( ) => null , null ],
}
const isValidEmail = ( email : string ) =>  {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test( email );
}
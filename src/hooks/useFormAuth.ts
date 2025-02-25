import { useState, useEffect, useCallback } from 'react'
import { UserInterface } from '../interfaces'
import { ErrorMessageAuth } from '../auth/interfaces'

export const useFormAuth = ( initialForm : UserInterface , validatorForm : ErrorMessageAuth ) => {

  const [ formState , setFormState ] = useState<UserInterface>( initialForm );
  const [formErrorMessage, setFormErrorMessage] = useState<Record<string, string | null>>({});


  const onInputChange = ( event : React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name] : value
    })
  }

  const checkValidation = useCallback ( () => {
    const errorMessage : Record<string, string | null> = {};

    for ( const field in validatorForm ) {
      const fieldValue = field as keyof ErrorMessageAuth;
      const [ validate, message ] = validatorForm[fieldValue];

      errorMessage[fieldValue] = validate( formState[fieldValue] ) ? null : message;
    }
    
    setFormErrorMessage( errorMessage );
  }, [formState, validatorForm]);

  const isFormValid = () => {
    for ( const field in formErrorMessage ) {
      if ( formErrorMessage[field] !== null ) {
        return false;
      }
    }
    return true;
  }

  const onResetForm = () => {
    setFormState( initialForm );
    setFormErrorMessage({});
  }

  // *Effects

  useEffect(() => {
    checkValidation();
  }, [ checkValidation ]);

  return {
    formState,
    formErrorMessage,
    onInputChange,
    checkValidation,
    isFormValid,
    onResetForm
  }
}

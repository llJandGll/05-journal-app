import { useState, useEffect, useCallback } from 'react'
import { Note } from '../store/journal/interfaces';
import { ErrorMessageNote } from '../journal/interfaces/ErrorMessageNote';

export const useFormJournal = ( initialForm : Note , validatorForm : ErrorMessageNote ) => {
  

  const [ formState , setFormState ] = useState<Note>( initialForm );
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
      const fieldValue = field as keyof ErrorMessageNote;
      const [ validate, message ] = validatorForm[fieldValue] ;

      errorMessage[fieldValue] = validate( formState[fieldValue] as string & string[]) ? null : message;
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
    setFormState( initialForm );
  }, [ initialForm ]);

  useEffect(() => {
    checkValidation();
  }, [ checkValidation ]);

  return {
    formState,
    formErrorMessage,
    onInputChange,
    isFormValid,
    onResetForm
  }
}

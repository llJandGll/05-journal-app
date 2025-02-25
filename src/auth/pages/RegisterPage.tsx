import { Link as RouterLink } from 'react-router';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useFormAuth } from '../../hooks/useFormAuth';
import { RegisterValidator } from '../validators/RegisterValidator';
import { UserInterface } from '../../interfaces';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppStore';
import { startRegisterUserWithEmailPassword } from '../../store/auth/thunks';

const initialForm : UserInterface = {
  name : '',
  email : '',
  password : '',
  uid : null,
  photoURL : null,
}

export const RegisterPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { formState, onInputChange, isFormValid, formErrorMessage, onResetForm } = useFormAuth( initialForm , RegisterValidator );

  const { name, email, password } = formState;
  const { name: nameError, email: emailError, password: passwordError } = formErrorMessage;
  

  const dispatch = useAppDispatch();
  const handleSubmit = async ( event : React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    setFormSubmitted(true);
    console.log('isformvalid', isFormValid());
    if ( !isFormValid() ) return;

    const resp = await dispatch( startRegisterUserWithEmailPassword( formState ) );
    if ( !resp ) return;

    setFormSubmitted(false);
    onResetForm();

  }

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={ handleSubmit }>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
                name="name"
                value={ name }
                onChange={ onInputChange }
                error={ !!nameError && formSubmitted }
                helperText={ nameError && formSubmitted ? nameError : null }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='jesus@google.com' 
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
                error={ !!emailError && formSubmitted }
                helperText={ emailError && formSubmitted ? emailError : null }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='*****' 
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
                error={ !!passwordError && formSubmitted }
                helperText={ passwordError && formSubmitted ? passwordError : null }
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>
                <Button 
                  type='submit'
                  variant='contained' 
                  fullWidth
                >
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}

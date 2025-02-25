import { Link as RouterLink } from 'react-router';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useFormAuth } from '../../hooks/useFormAuth';
import { UserInterface } from '../../interfaces';
import { useState } from 'react';
import { startLoginUserWithEmailPassword } from '../../store/auth/thunks';
import { useAppDispatch } from '../../hooks/useAppStore';
import { LoginValidator } from '../validators/LoginValidator';

const initialForm : UserInterface = {
  name : null,
  email : '',
  password : '',
  uid : null,
  photoURL : null,
}

export const LoginPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { formState, onInputChange, isFormValid, formErrorMessage, onResetForm } = useFormAuth( initialForm , LoginValidator );
  const { email, password } = formState;
  const { email: emailError, password: passwordError } = formErrorMessage;

  console.log('email, password', email, password);
  const dispatch = useAppDispatch();

  const handleSubmit = async ( event : React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    setFormSubmitted(true);
    if ( !isFormValid() ) return;

    const resp = await dispatch( startLoginUserWithEmailPassword( formState ) );
    if ( !resp ) return;

    setFormSubmitted(false);
    onResetForm();

  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={ handleSubmit }>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
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
                placeholder='Contraseña' 
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
                error={ !!passwordError && formSubmitted }
                helperText={ passwordError && formSubmitted ? passwordError : null }
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                  type='submit'
                  variant='contained' 
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button variant='contained' fullWidth>
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}

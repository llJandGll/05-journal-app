import { Navigate, Route, Routes } from 'react-router';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { useAppDispatch, useAppSelector } from '../hooks/useAppStore';
import { CheckingAuth } from '../ui/components/CheckingAuth';
import { useEffect } from 'react';
import { onLogin, onLogout } from '../store/auth/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';


export const AppRouter = () => {

  const { status, isRegistering   } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isRegistering) return;
    
    // Referencia para evitar efectos después de desmontar
    let isMounted = true;
    
    onAuthStateChanged(FirebaseAuth, (user) => {
      // Evitar acciones si el componente se desmontó
      if (!isMounted) return;
      
      if (!user) {
        dispatch(onLogout('user not found or not authenticated'));
        return;
      }
      
      console.log('user', user);
      const { email, displayName, photoURL, uid } = user;
      if (!email) {
        dispatch(onLogout('email not found'));
        return;
      };
      
      // Único lugar donde se actualiza el estado de autenticación
      dispatch(onLogin({ email, name: displayName, photoURL, uid, password: '' }));
    });
    
    // Limpiar al desmontar
    return () => {
      isMounted = false;
    };
  }, [dispatch, isRegistering]);

  if ( status === 'checking' || isRegistering ) return <CheckingAuth />;

  return (
    <Routes>
      {
        status === 'authenticated' ? 
        <>
          <Route path="/journal/*" element={ <JournalRoutes /> } />
          <Route path='*' element= { <Navigate to={ '/journal'} /> }/>
        </>
        : 
        <>
          <Route path="/auth/*" element={ <AuthRoutes /> } />
          <Route path='*' element= { <Navigate to={ '/auth/login' } /> }/>
        </>

      }

        <Route path="/*" element={ <Navigate to="/auth/login" /> } />

    </Routes>
  )
}

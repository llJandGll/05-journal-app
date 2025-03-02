import { Navigate, Route, Routes } from 'react-router';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui/components/CheckingAuth';
import { useCheckAuth } from '../hooks/useCheckAuth';


export const AppRouter = () => {

  const { status, isRegistering } = useCheckAuth();
  

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

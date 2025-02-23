import { Navigate, Route, Routes } from 'react-router';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';


export const AppRouter = () => {
  return (
    <Routes>

        {/* Login y Registro */}
        <Route path="/auth/*" element={ <AuthRoutes /> } />

        {/* JournalApp */}
        <Route path="/journal/*" element={ <JournalRoutes /> } />

        <Route path="/*" element={ <Navigate to="/auth/login" /> } />

    </Routes>
  )
}

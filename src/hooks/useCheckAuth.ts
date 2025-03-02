import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useAppStore";
import { onAuthStateChanged } from "firebase/auth";
import { onLogin, onLogout } from "../store/auth/authSlice";
import { FirebaseAuth } from "../firebase/config";
import { startLoadingNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {
  const { status, isRegistering   } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isRegistering) return;
    
    let isMounted = true;
    
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (!isMounted) return;
      
      if (!user) {
        dispatch(onLogout('user not found or not authenticated'));
        return;
      }
      
      const { email, displayName, photoURL, uid } = user;
      if (!email) {
        dispatch(onLogout('email not found'));
        return;
      };
      
      dispatch(onLogin({ email, name: displayName, photoURL, uid, password: '' }));
      dispatch(startLoadingNotes());
    });
    
    return () => {
      isMounted = false;
    };
  }, [dispatch, isRegistering]);


  return {
    status,
    isRegistering
  }
}

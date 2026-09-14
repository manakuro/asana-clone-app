import { useEffect, useState } from 'react';
import { onAuthStateChanged } from '@/lib/firebase/auth/on-auth-state-changed';
import { signInAnonymously } from '@/lib/firebase/auth/sign-in-anonymously';
import { createContext } from '@/lib/react/create-context';

const useValue = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(async (user) => {
      if (!user) {
        console.log('sign in anonymously');
        await signInAnonymously();
        return;
      }
      setIsAuthenticated(true);
    });
  }, []);

  return {
    isAuthenticated,
  };
};
export const { Context: AuthContext, useContext: useAuthContext } =
  createContext(useValue, 'AuthContext');

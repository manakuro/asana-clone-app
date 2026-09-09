import { useEffect, useState } from 'react';
import { onAuthStateChanged } from '@/lib/firebase/auth/on-auth-state-changed';
import { signInAnonymously } from '@/lib/firebase/auth/sign-in-anonymously';
import { createContext } from '@/lib/react/create-context';

const useValue = () => {
  const [idToken, setIdToken] = useState('');

  useEffect(() => {
    return onAuthStateChanged(async (user) => {
      console.log('user', user);
      if (user) {
        const token = await user.getIdToken();
        setIdToken(token);
      } else {
        console.log('sign in anonymously');
        await signInAnonymously();
      }
    });
  }, []);

  return {
    idToken,
  };
};
export const { Context: AuthContext, useContext: useAuthContext } =
  createContext(useValue, 'AuthContext');

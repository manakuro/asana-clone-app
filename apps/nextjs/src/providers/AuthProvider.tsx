import {
  onAuthStateChanged,
  onIdTokenChanged,
  signInAnonymously,
} from '@/shared/firebase/auth';
import { createProvider } from '@/shared/react/createProvider';
import { useEffect, useState } from 'react';

const useValue = () => {
  const [idToken, setIdToken] = useState('');

  useEffect(() => {
    const unsubscribeAuthStateChanged = onAuthStateChanged(async (user) => {
      if (!user) {
        console.log('signInAnonymously!');
        await signInAnonymously();
      }
    });
    const unsubscribeIdTokenChanged = onIdTokenChanged(async (user) => {
      if (!user) return;
      const id = await user.getIdToken();
      setIdToken(id);
    });

    return () => {
      unsubscribeAuthStateChanged();
      unsubscribeIdTokenChanged();
    };
  }, []);

  return {
    idToken,
  };
};
export const { Provider: AuthProvider, useContext: useAuthContext } =
  createProvider(useValue, 'AuthProvider');

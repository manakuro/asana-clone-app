'use client';

import { useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  onIdTokenChanged,
  signInAnonymously,
} from '@/shared/firebase/auth';
import { createContext } from '@/shared/react/create-context';

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
export const { Context: AuthContext, useContext: useAuthContext } =
  createContext(useValue, 'AuthContext');

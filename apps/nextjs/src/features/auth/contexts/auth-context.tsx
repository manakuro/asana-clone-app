'use client';

import { useEffect, useState } from 'react';
import { toaster } from '@/lib/chakra-ui/generated/toaster';
import { getIdTokenAction } from '@/lib/firebase/auth/actions';
import { createContext } from '@/lib/react/create-context';

const useValue = () => {
  const [idToken, setIdToken] = useState('');

  useEffect(() => {
    (async () => {
      const token = await getIdTokenAction();
      if (!token.ok) {
        toaster.error({
          title: `An error occurred.(${token.error})`,
          description:
            'Unable to connect user account. Reloading will be done automatically.',
          duration: 1000000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);

        return;
      }

      setIdToken(token.idToken);
    })();
  }, []);

  return {
    idToken,
  };
};
export const { Context: AuthContext, useContext: useAuthContext } =
  createContext(useValue, 'AuthContext');

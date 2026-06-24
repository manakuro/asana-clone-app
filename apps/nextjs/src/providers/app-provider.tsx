'use client';

import type { PropsWithChildren } from 'react';
import { Provider as ChakraProvider } from '@/chakra-ui/ui/provider';
import { Modals } from '@/components/features/modals';
import { GlobalQuery, Subscription } from '@/components/shared/app';
import { Mobile } from '@/components/ui/mobile';
import { PageLoader } from '@/components/ui/page-loader';
import { Toaster } from '@/components/ui/toast';
import { ApolloProvider } from '@/shared/apollo/ApolloProvider';
import { AuthProvider, useAuthContext } from './auth-provider';

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Mobile>
          <Inner>{children}</Inner>
        </Mobile>
      </ChakraProvider>
    </AuthProvider>
  );
}

function Inner({ children }: PropsWithChildren) {
  const { idToken } = useAuthContext();
  if (!idToken) {
    return <PageLoader />;
  }

  return (
    <ApolloProvider>
      <GlobalQuery>
        <Subscription>
          {children}
          <Modals />
          <Toaster />
        </Subscription>
      </GlobalQuery>
    </ApolloProvider>
  );
}

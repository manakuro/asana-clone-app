'use client';

import type { PropsWithChildren } from 'react';
import { Provider as ChakraProvider } from '@/chakra-ui/ui/provider';
import { Modals } from '@/components/layout/modals/modals';
import { Mobile } from '@/components/ui/mobile';
import { PageLoader } from '@/components/ui/page-loader';
import { Toaster } from '@/components/ui/toast';
import { ApolloProvider } from '@/lib/apollo/apollo-provider';
import { useAuthContext } from '../auth-context';
import { GlobalQuery } from './global-query';
import { Subscription } from './subscription';

export function AppContext({ children }: PropsWithChildren) {
  return (
    <ChakraProvider>
      <Mobile>
        <Inner>{children}</Inner>
      </Mobile>
    </ChakraProvider>
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

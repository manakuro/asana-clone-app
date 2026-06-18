import { ApolloProvider as ApolloProviderLibs } from '@apollo/client/react';
import type React from 'react';
import { type PropsWithChildren, Suspense, useMemo } from 'react';
import { Provider as ChakraProvider } from '@/chakra-ui/ui/provider';
import { Modals } from '@/components/features/Modals';
import { GlobalQuery } from '@/components/shared/app';
import { PageLoader } from '@/components/ui/page-loader';
import { createApolloClient } from '@/shared/apollo/client';

export const Provider: React.FCWithChildren = (props) => {
  return (
    <ChakraProvider>
      <Suspense fallback={<PageLoader />}>
        <ApolloProvider>
          <GlobalQuery>
            {props.children}
            <Modals />
          </GlobalQuery>
        </ApolloProvider>
      </Suspense>
    </ChakraProvider>
  );
};

function ApolloProvider({ children }: PropsWithChildren) {
  const client = useMemo(() => createApolloClient({ idToken: '' }), []);

  return <ApolloProviderLibs client={client}>{children}</ApolloProviderLibs>;
}

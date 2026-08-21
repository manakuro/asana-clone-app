import { ApolloProvider as ApolloProviderLibs } from '@apollo/client/react';
import type React from 'react';
import { type PropsWithChildren, Suspense, useMemo } from 'react';
import { GlobalQuery } from '@/components/layout/app-context/global-query';
import { Modals } from '@/components/layout/modals/modals';
import { PageLoader } from '@/components/ui/page-loader';
import { createApolloClient } from '@/lib/apollo/client';
import { Provider as ChakraProvider } from '@/lib/chakra-ui/generated/provider';

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
  const client = useMemo(
    () => createApolloClient({ idToken: '', disablePersistedQueries: true }),
    [],
  );

  return <ApolloProviderLibs client={client}>{children}</ApolloProviderLibs>;
}

import type React from 'react';
import { Suspense } from 'react';
import { Provider as ChakraProvider } from '@/chakra-ui/ui/provider';
import { Modals } from '@/components/features/Modals';
import { GlobalQuery } from '@/components/shared/app';
import { PageLoader } from '@/components/ui/PageLoader';
import { ApolloProvider } from '@/shared/apollo/ApolloProvider';

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

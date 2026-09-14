import { ApolloProvider as ApolloProviderLibs } from '@apollo/client/react';
import type { PropsWithChildren } from 'react';
import { createApolloClient } from './client';

const client = createApolloClient();
export function ApolloProvider({ children }: PropsWithChildren) {
  return <ApolloProviderLibs client={client}>{children}</ApolloProviderLibs>;
}

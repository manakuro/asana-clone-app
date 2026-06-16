import { ApolloProvider as ApolloProviderLibs } from '@apollo/client/react';
import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { useAuthContext } from '@/providers/AuthProvider';
import { createApolloClient } from './client';

export function ApolloProvider({ children }: PropsWithChildren) {
  const { idToken } = useAuthContext();

  // biome-ignore lint/correctness/useExhaustiveDependencies: used for memoization
  const client = useMemo(() => createApolloClient({ idToken }), []);

  return <ApolloProviderLibs client={client}>{children}</ApolloProviderLibs>;
}

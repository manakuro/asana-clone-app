import type { PropsWithChildren } from 'react';
import { AnimatedSplashOverlay } from '@/components/animated-icon';
import {
  AuthContext,
  useAuthContext,
} from '@/features/auth/contexts/auth-context';
import { ApolloProvider } from '@/lib/apollo/apollo-provider';

export function AppContext({ children }: PropsWithChildren) {
  return (
    <AuthContext>
      <Inner>{children}</Inner>
    </AuthContext>
  );
}

function Inner({ children }: PropsWithChildren) {
  const { idToken } = useAuthContext();
  if (!idToken) {
    return null;
  }

  return (
    <ApolloProvider>
      <AnimatedSplashOverlay />
      {children}
    </ApolloProvider>
  );
}

import { CombinedGraphQLErrors, Observable, ServerError } from '@apollo/client';
import type { ErrorLink } from '@apollo/client/link/error';
import { getAuth } from '@react-native-firebase/auth';
import { signInAnonymously } from '@/lib/firebase/auth/sign-in-anonymously';

// For websocket - updated for graphql-ws compatibility
export const websocketErrorHandler = (errors: unknown[]) => {
  const authError = errors.find((e) => {
    const message = e instanceof Error ? e.message : String(e);
    return message.indexOf('has expired at') !== -1;
  });
  if (authError) {
    console.error('auth error!');
  }
};

// For graphql
export const graphqlErrorHandler = ({
  error,
  operation,
  forward,
}: ErrorLink.ErrorHandlerOptions) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  }

  if (ServerError.is(error) && error?.statusCode === 401) {
    return new Observable((observer) => {
      (async () => {
        try {
          let user = getAuth().currentUser;
          let newToken: string;

          try {
            if (!user) throw new Error('no current user');
            newToken = await user.getIdToken(true);
          } catch {
            await signInAnonymously();
            user = getAuth().currentUser;
            newToken = (await user?.getIdToken(true)) || '';
          }

          const oldHeaders = operation.getContext().headers;
          operation.setContext({
            headers: { ...oldHeaders, authorization: `Bearer ${newToken}` },
          });

          forward(operation).subscribe(observer);
        } catch (e) {
          observer.error(e);
        }
      })();
    });
  }

  if (ServerError.is(error)) console.log(`[Network error]: ${error.message}`);
};

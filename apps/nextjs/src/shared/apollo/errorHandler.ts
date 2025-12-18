import type { ErrorResponse } from '@apollo/client/link/error';
import { useStandaloneToast } from '@/hooks';

let unauthorized = false;

// For websocket
export const websocketErrorHandler = async (errors: Error[]) => {
  const authError = errors.find((e) => ~e?.message.indexOf('has expired at'));
  if (authError) {
    console.error('auth error!');
    handleUnauthorizedError();
  }
};

// For graphql
export const graphqlErrorHandler = ({
  graphQLErrors,
  networkError,
}: ErrorResponse) => {
  console.log('graphQLErrors: ', graphQLErrors);
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });

  if ((networkError as any)?.statusCode === 401) {
    handleUnauthorizedError();
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
};

const handleUnauthorizedError = () => {
  if (unauthorized) return;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // biome-ignore lint/correctness/useHookAtTopLevel: used for error handling
  const { toast } = useStandaloneToast();

  toast({
    title: 'An error occurred.',
    description:
      'Unable to connect user account. Reloading will be done automatically.',
    status: 'error',
    duration: 1000000,
  });
  setTimeout(() => {
    window.location.reload();
  }, 3000);

  unauthorized = true;
};

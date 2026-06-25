import { CombinedGraphQLErrors, ServerError } from '@apollo/client';
import type { ErrorLink } from '@apollo/client/link/error';
import { toaster } from '@/chakra-ui/ui/toaster';

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
  error,
}: ErrorLink.ErrorHandlerOptions) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  }

  if (ServerError.is(error) && error?.statusCode === 401) {
    handleUnauthorizedError();
  }

  if (ServerError.is(error)) console.log(`[Network error]: ${error.message}`);
};

const handleUnauthorizedError = () => {
  if (unauthorized) return;

  toaster.error({
    title: 'An error occurred.',
    description:
      'Unable to connect user account. Reloading will be done automatically.',
    duration: 1000000,
  });
  setTimeout(() => {
    window.location.reload();
  }, 3000);

  unauthorized = true;
};

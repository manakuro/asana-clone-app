import { ErrorLink } from '@apollo/client/link/error';
import { graphqlErrorHandler } from '@/lib/apollo/error-handler';

export const createErrorLink = () =>
  new ErrorLink((options) => {
    graphqlErrorHandler(options);
  });

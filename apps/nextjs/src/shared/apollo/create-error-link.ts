import { ErrorLink } from '@apollo/client/link/error';
import { graphqlErrorHandler } from '@/shared/apollo/error-handler';

export const createErrorLink = () =>
  new ErrorLink((options) => {
    graphqlErrorHandler(options);
  });

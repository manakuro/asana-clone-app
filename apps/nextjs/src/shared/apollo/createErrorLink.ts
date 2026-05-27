import { ErrorLink } from '@apollo/client/link/error';
import { graphqlErrorHandler } from '@/shared/apollo/errorHandler';

export const createErrorLink = () =>
  new ErrorLink((options) => {
    graphqlErrorHandler(options);
  });

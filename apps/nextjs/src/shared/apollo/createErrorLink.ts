import { onError } from '@apollo/client/link/error';
import { graphqlErrorHandler } from '@/shared/apollo/errorHandler';

export const createErrorLink = () =>
  onError((error) => {
    graphqlErrorHandler(error);
  });

import { ApolloLink, HttpLink } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { config } from '@/config';
import { websocketErrorHandler } from '@/lib/apollo/error-handler';
import { isClient } from '@/utils/environment';

export type CreateHttpProps = {
  idToken: string;
};

export const createHttpLink = (props: CreateHttpProps) => {
  const httpLink = new HttpLink({
    uri: config.API_URL,
    headers: {
      Authorization: `Bearer ${props.idToken}`,
    },
  });

  if (isClient()) {
    const wsClient = createClient({
      url: config.API_SUBSCRIPTION_URL,
      lazy: true,
      retryAttempts: Infinity,
      shouldRetry: () => true,
      connectionParams: () => ({
        authorization: `Bearer ${props.idToken}`,
      }),
      on: {
        error: (error) => {
          const errors = Array.isArray(error) ? error : [error];
          websocketErrorHandler(errors);
        },
      },
    });
    const wsLink = new GraphQLWsLink(wsClient);

    return ApolloLink.split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink,
    );
  }

  return httpLink;
};

import { ApolloLink, HttpLink } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { config } from '@/config';
import { isClient } from '@/shared/environment';

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
      connectionParams: () => ({
        authorization: `Bearer ${props.idToken}`,
      }),
      // connectionCallback: async (err) => {
      //   const errors = Array.isArray(err) ? err : [err];
      //   await websocketErrorHandler(errors);
      // },
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

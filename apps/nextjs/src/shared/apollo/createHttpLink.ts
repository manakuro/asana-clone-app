import { ApolloLink, HttpLink } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { config } from '@/config';
import { websocketErrorHandler } from '@/shared/apollo/errorHandler';
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
    const wsClient = new SubscriptionClient(config.API_SUBSCRIPTION_URL, {
      lazy: true,
      reconnect: true,
      connectionParams: () => ({
        authorization: `Bearer ${props.idToken}`,
      }),
      connectionCallback: async (err) => {
        const errors = Array.isArray(err) ? err : [err];
        await websocketErrorHandler(errors);
      },
    });
    const wsLink = new WebSocketLink(wsClient);

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

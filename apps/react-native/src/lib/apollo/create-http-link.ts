import { ApolloLink, HttpLink } from '@apollo/client/core';
import { SetContextLink } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { getAuth } from '@react-native-firebase/auth';
import { createClient } from 'graphql-ws';
import { config } from '@/config';
import { websocketErrorHandler } from '@/lib/apollo/error-handler';

const authLink = new SetContextLink(async (prevContext) => {
  const idToken = await getAuth().currentUser?.getIdToken();
  return {
    headers: {
      ...prevContext.headers,
      ...(idToken ? { authorization: `Bearer ${idToken}` } : {}),
    },
  };
});

export const createHttpLink = () => {
  const httpLink = ApolloLink.from([
    authLink,
    new HttpLink({ uri: config.API_URL }),
  ]);

  const wsClient = createClient({
    url: config.API_SUBSCRIPTION_URL,
    lazy: true,
    retryAttempts: Infinity,
    shouldRetry: () => true,
    connectionParams: async () => ({
      authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
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
};

import {
  ApolloClient,
  InMemoryCache,
  type NormalizedCacheObject,
} from '@apollo/client';
import { refreshToken } from '@/shared/firebase/auth';
import { type CreateLinkProps, createLink } from './createLink';

type Props = CreateLinkProps;
let client: ApolloClient<NormalizedCacheObject>;
export const createApolloClient = (props: Props) => {
  if (!client) {
    client = new ApolloClient({
      link: createLink(props),
      cache: new InMemoryCache(),
      defaultOptions: {
        // NOTE: Prevent unnecessary re-fetching after mutation.
        // @see https://github.com/apollographql/apollo-client/issues/6833
        watchQuery: {
          fetchPolicy: 'no-cache',
        },
        query: {
          fetchPolicy: 'no-cache',
        },
        mutate: {
          fetchPolicy: 'no-cache',
        },
      },
    });
    return client;
  }

  return client;
};

export const resetApolloLink = async () => {
  const idToken = await refreshToken();
  if (!idToken) return;

  console.log('apollo client sets new link');
  client.setLink(createLink({ idToken }));
};

export const setErrorToken = () => {
  client.setLink(createLink({ idToken: 'test' }));
};

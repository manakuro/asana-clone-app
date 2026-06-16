import { ApolloProvider as ApolloProviderLibs } from '@apollo/client/react';
import type React from 'react';
import { useMemo } from 'react';
import { Provider as ChakraProvider } from '@/chakra-ui/ui/provider';
import { Modals } from '@/components/features/Modals';
import {
  useFavoriteProjectIdsQuery,
  useFavoriteWorkspaceIdsQuery,
  useMeQuery,
  useProjectBaseColorsQuery,
  useProjectIconsQuery,
  useProjectLightColorsQuery,
  useProjectsQuery,
  useTaskPrioritiesQuery,
  useTeammateTaskTabStatusQuery,
  useWorkspaceQuery,
} from '@/hooks/queries/entities';
import { createApolloClient } from '@/shared/apollo/client';

export const Provider: React.FCWithChildren = (props) => {
  return (
    <ChakraProvider>
      <ApolloProvider>
        <GlobalQuery>
          {props.children}
          <Modals />
        </GlobalQuery>
      </ApolloProvider>
    </ChakraProvider>
  );
};

const ApolloProvider: React.FCWithChildren = (props) => {
  const client = useMemo(() => createApolloClient({ idToken: 'token' }), []);

  return (
    <ApolloProviderLibs client={client}>{props.children}</ApolloProviderLibs>
  );
};

const GlobalQuery: React.FCWithChildren = (props) => {
  useTaskPrioritiesQuery();
  useProjectsQuery();
  useProjectBaseColorsQuery();
  useProjectLightColorsQuery();
  useProjectIconsQuery();
  useFavoriteWorkspaceIdsQuery();
  useWorkspaceQuery();
  useMeQuery();
  useFavoriteProjectIdsQuery();
  useTeammateTaskTabStatusQuery();

  return <>{props.children}</>;
};

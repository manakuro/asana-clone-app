import { ApolloProvider as ApolloProviderLibs } from '@apollo/client/react';
import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { Provider as ChakraProvider } from '@/chakra-ui/ui/provider';
import { Modals } from '@/components/layout/modals/modals';
import { useFavoriteProjectIdsQuery } from '@/hooks/queries/entities/use-favorite-project-ids-query';
import { useFavoriteWorkspaceIdsQuery } from '@/hooks/queries/entities/use-favorite-workspace-ids-query';
import { useMeQuery } from '@/hooks/queries/entities/use-me-query';
import { useProjectBaseColorsQuery } from '@/hooks/queries/entities/use-project-base-colors-query';
import { useProjectIconsQuery } from '@/hooks/queries/entities/use-project-icons-query';
import { useProjectLightColorsQuery } from '@/hooks/queries/entities/use-project-light-colors-query';
import { useProjectsQuery } from '@/hooks/queries/entities/use-projects-query';
import { useTaskPrioritiesQuery } from '@/hooks/queries/entities/use-task-priorities-query';
import { useTeammateTaskTabStatusQuery } from '@/hooks/queries/entities/use-teammate-task-tab-status-query';
import { useWorkspaceQuery } from '@/hooks/queries/entities/use-workspace-query';
import { createApolloClient } from '@/shared/apollo/client';

export const Provider = (props: PropsWithChildren) => {
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

const ApolloProvider = (props: PropsWithChildren) => {
  const client = useMemo(() => createApolloClient({ idToken: 'token' }), []);

  return (
    <ApolloProviderLibs client={client}>{props.children}</ApolloProviderLibs>
  );
};

const GlobalQuery = (props: PropsWithChildren) => {
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

import { ApolloProvider as ApolloProviderLibs } from '@apollo/client/react';
import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { Modals } from '@/components/layout/modals/modals';
import { useTeammateTaskTabStatusQuery } from '@/components/pages/my-tasks/index/api/use-teammate-task-tab-status-query';
import { useFavoriteProjectIdsQuery } from '@/features/me/api/use-favorite-project-ids-query';
import { useFavoriteWorkspaceIdsQuery } from '@/features/me/api/use-favorite-workspace-ids-query';
import { useMeQuery } from '@/features/me/api/use-me-query';
import { useProjectBaseColorsQuery } from '@/features/project/api/use-project-base-colors-query';
import { useProjectIconsQuery } from '@/features/project/api/use-project-icons-query';
import { useProjectLightColorsQuery } from '@/features/project/api/use-project-light-colors-query';
import { useProjectsQuery } from '@/features/project/api/use-projects-query';
import { useTaskPrioritiesQuery } from '@/features/task/api/use-task-priorities-query';
import { useWorkspaceQuery } from '@/features/workspace/api/use-workspace-query';
import { createApolloClient } from '@/lib/apollo/client';
import { Provider as ChakraProvider } from '@/lib/chakra-ui/generated/provider';

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
  const client = useMemo(
    () =>
      createApolloClient({ idToken: 'token', enablePersistedQueries: false }),
    [],
  );

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

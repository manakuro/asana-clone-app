import { useProjectsLazyQuery } from '@/graphql/hooks';
import type { ProjectResponse, ProjectsQuery } from '@/graphql/types/project';
import { getNodesFromEdges } from '@/shared/apollo/util';
import type { Project } from '@/store/entities/project';
import { useWorkspace } from '@/store/entities/workspace';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const searchProjectsQueryAtom = atom<{
  loading: boolean;
  projects: Project[];
}>({
  loading: false,
  projects: [],
});

type Props = {
  queryText: string;
};
export const useSearchProjectsQuery = () => {
  const [state, setState] = useAtom(searchProjectsQueryAtom);
  const [refetchQuery] = useProjectsLazyQuery();
  const { workspace } = useWorkspace();

  const refetch = useCallback(
    async (props: Props) => {
      setState((s) => ({ ...s, loading: true }));
      const res = await refetchQuery({
        variables: {
          where: {
            workspaceID: workspace.id,
            nameContainsFold: props.queryText,
          },
        },
      });

      const projects = getNodesFromEdges<
        ProjectResponse,
        ProjectsQuery['projects']
      >(res.data?.projects);

      setState((s) => ({ ...s, projects, loading: false }));
      return projects;
    },
    [refetchQuery, setState, workspace.id],
  );

  return {
    refetch,
    ...state,
  };
};

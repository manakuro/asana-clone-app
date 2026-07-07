import { useLazyQuery } from '@apollo/client/react';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';
import type { Project } from '@/features/project/store/project';
import { useWorkspace } from '@/features/workspace/store/workspace';
import { ProjectsDocument } from '@/graphql/documents';
import type { ProjectResponse, ProjectsQuery } from '@/graphql/types/project';
import { getNodesFromEdges } from '@/lib/apollo/util';

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
  const [refetchQuery] = useLazyQuery(ProjectsDocument);
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

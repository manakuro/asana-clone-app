import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';
import { useWorkspaceTeammatesLazyQuery } from 'src/graphql/hooks';
import type {
  WorkspaceTeammateResponse,
  WorkspaceTeammatesQuery,
} from 'src/graphql/types/workspaceTeammate';
import { getNodesFromEdges } from 'src/shared/apollo/util';
import type { Teammate } from 'src/store/entities/teammate';

const queryAtom = atom<{ loading: boolean; teammates: Teammate[] }>({
  loading: false,
  teammates: [],
});

type Props = {
  queryText: string;
};
export const useSearchWorkspaceTeammatesQuery = () => {
  const [state, setState] = useAtom(queryAtom);
  const [refetchQuery] = useWorkspaceTeammatesLazyQuery();

  const refetch = useCallback(
    async (props: Props) => {
      setState((s) => ({ ...s, loading: true }));
      const res = await refetchQuery({
        variables: {
          first: 10,
          where: {
            hasTeammateWith: [
              {
                or: [
                  { emailContainsFold: props.queryText },
                  { nameContainsFold: props.queryText },
                ],
              },
            ],
          },
        },
      });
      const workspaceTeammates = getNodesFromEdges<
        WorkspaceTeammateResponse,
        WorkspaceTeammatesQuery['workspaceTeammates']
      >(res.data?.workspaceTeammates);

      const teammates = workspaceTeammates.map((p) => p.teammate);

      setState((s) => ({ ...s, teammates, loading: false }));
      return teammates;
    },
    [refetchQuery, setState],
  );

  const setTeammates = useCallback(
    (val: Teammate[]) => {
      setState((s) => ({ ...s, teammates: val }));
    },
    [setState],
  );

  const setLoading = useCallback(
    (val: boolean) => {
      setState((s) => ({ ...s, loading: val }));
    },
    [setState],
  );

  return {
    refetch,
    setTeammates,
    setLoading,
    ...state,
  };
};

import { useProjectTeammatesLazyQuery } from '@/graphql/hooks';
import type {
  ProjectTeammateResponse,
  ProjectTeammatesQuery,
} from '@/graphql/types/projectTeammate';
import { getNodesFromEdges } from '@/shared/apollo/util';
import type { Teammate } from '@/store/entities/teammate';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const queryAtom = atom<{ loading: boolean; teammates: Teammate[] }>({
  loading: false,
  teammates: [],
});

type Props = {
  queryText: string;
};
export const useSearchProjectTeammatesQuery = () => {
  const [state, setState] = useAtom(queryAtom);
  const [refetchQuery] = useProjectTeammatesLazyQuery();

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
      const projectTeammates = getNodesFromEdges<
        ProjectTeammateResponse,
        ProjectTeammatesQuery['projectTeammates']
      >(res.data?.projectTeammates);

      const teammates = projectTeammates.map((p) => p.teammate);

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

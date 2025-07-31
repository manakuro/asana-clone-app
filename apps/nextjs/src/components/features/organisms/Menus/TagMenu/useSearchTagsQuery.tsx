import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';
import { useTagsLazyQuery } from 'src/graphql/hooks';
import type { TagResponse, TagsQuery } from 'src/graphql/types/tag';
import { getNodesFromEdges } from 'src/shared/apollo/util';
import { useWorkspace } from 'src/store/entities/workspace';

const searchTagsQueryAtom = atom<{ loading: boolean; tags: any[] }>({
  loading: false,
  tags: [],
});

type Props = {
  queryText: string;
};
export const useSearchTagsQuery = () => {
  const [state, setState] = useAtom(searchTagsQueryAtom);
  const [refetchQuery] = useTagsLazyQuery();
  const { workspace } = useWorkspace();

  const refetch = useCallback(
    async (props: Props) => {
      setState((s) => ({ ...s, loading: true }));
      const res = await refetchQuery({
        variables: {
          first: 10,
          where: {
            nameContainsFold: props.queryText,
            workspaceID: workspace.id,
          },
        },
      });

      const tags = getNodesFromEdges<TagResponse, TagsQuery['tags']>(
        res.data?.tags,
      );

      setState((s) => ({ ...s, tags, loading: false }));
      return tags;
    },
    [refetchQuery, setState, workspace.id],
  );

  return {
    refetch,
    ...state,
  };
};

import { useLazyQuery } from '@apollo/client/react';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';
import { useWorkspace } from '@/features/workspace/store/workspace';
import { TagsDocument } from '@/graphql/documents';
import type { TagResponse, TagsQuery } from '@/graphql/types/tag';
import { getNodesFromEdges } from '@/lib/apollo/util';

const searchTagsQueryAtom = atom<{ loading: boolean; tags: any[] }>({
  loading: false,
  tags: [],
});

type Props = {
  queryText: string;
};
export const useSearchTagsQuery = () => {
  const [state, setState] = useAtom(searchTagsQueryAtom);
  const [refetchQuery] = useLazyQuery(TagsDocument);
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

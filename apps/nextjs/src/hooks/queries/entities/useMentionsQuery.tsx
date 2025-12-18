import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';
import { useMentionLazyQuery as useQuery } from '@/graphql/hooks';
import type { Mention } from '@/store/entities/mention';
import { useWorkspace } from '@/store/entities/workspace';

const loadingAtom = atom<boolean>(false);

const mentionsAtom = atom<Mention[]>([]);

type Props = {
  queryText: string;
};
export const useMentionsQuery = () => {
  const [loading, setLoading] = useAtom(loadingAtom);
  const [mentions, setMentions] = useAtom(mentionsAtom);
  const [refetchQuery] = useQuery({
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (!data.mentions) return;

      setMentions(data.mentions as Mention[]);
    },
  });
  const { workspace } = useWorkspace();

  const refetch = useCallback(
    async (props: Props) => {
      setLoading(true);
      await refetchQuery({
        variables: {
          where: {
            workspaceId: workspace.id,
            query: props.queryText,
            limit: 10,
          },
        },
      });
      setLoading(false);
    },
    [refetchQuery, setLoading, workspace.id],
  );

  return {
    refetch,
    mentions,
    loading,
  };
};

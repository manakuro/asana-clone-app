import { useLazyQuery } from '@apollo/client/react';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';
import { MentionDocument } from '@/graphql/hooks';
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
  const [refetchQuery] = useLazyQuery(MentionDocument, {
    fetchPolicy: 'no-cache',
  });
  const { workspace } = useWorkspace();

  const refetch = useCallback(
    async (props: Props) => {
      setLoading(true);
      const result = await refetchQuery({
        variables: {
          where: {
            workspaceId: workspace.id,
            query: props.queryText,
            limit: 10,
          },
        },
      });
      if (result.data?.mentions) {
        setMentions(result.data.mentions as Mention[]);
      }
      setLoading(false);
    },
    [refetchQuery, setLoading, workspace.id, setMentions],
  );

  return {
    refetch,
    mentions,
    loading,
  };
};

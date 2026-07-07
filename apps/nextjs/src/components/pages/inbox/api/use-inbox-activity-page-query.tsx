import { useQuery } from '@apollo/client/react';
import { useEffect, useMemo, useState } from 'react';
import { useActivityResponse } from '@/components/pages/inbox/store/activity';
import { useWorkspace } from '@/features/workspace/store/workspace';
import { InboxActivityPageDocument } from '@/graphql/documents';
import { useMountedRef } from '@/hooks/use-mounted-ref';

export const useInboxActivityPageQuery = () => {
  const { workspace } = useWorkspace();
  const skip = useMemo(() => !workspace.id, [workspace.id]);
  const [loading, setLoading] = useState(true);
  const { setActivity } = useActivityResponse();
  const { mountedRef } = useMountedRef();

  const { data } = useQuery(InboxActivityPageDocument, {
    variables: {
      workspaceId: workspace.id,
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    skip,
  });

  useEffect(() => {
    if (!mountedRef.current) return;
    if (!data) return;

    setActivity(data);
    setLoading(false);
  }, [data, mountedRef.current, setActivity]);

  return {
    loading,
  };
};

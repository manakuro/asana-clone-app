import { useQuery } from '@apollo/client/react';
import { useEffect, useMemo, useState } from 'react';
import { InboxActivityPageDocument } from '@/graphql/hooks';
import { useMountedRef } from '@/hooks';
import { useActivityResponse } from '@/store/app/inbox/activity';
import { useWorkspace } from '@/store/entities/workspace';

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

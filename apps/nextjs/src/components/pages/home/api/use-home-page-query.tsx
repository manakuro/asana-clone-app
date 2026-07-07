import { useQuery } from '@apollo/client/react';
import { useEffect, useMemo, useState } from 'react';
import { useHomeResponse } from '@/components/pages/home/store';
import { useMe } from '@/features/me/store/me';
import { useWorkspace } from '@/features/workspace/store/workspace';
import { HomePageDocument } from '@/graphql/documents';
import { useMountedRef } from '@/hooks/use-mounted-ref';

export const useHomePageQuery = () => {
  const { me } = useMe();
  const { workspace } = useWorkspace();
  const skip = useMemo(() => !me.id || !workspace.id, [me.id, workspace.id]);
  const [loading, setLoading] = useState(true);
  const { setHome } = useHomeResponse();
  const { mountedRef } = useMountedRef();

  const { data } = useQuery(HomePageDocument, {
    variables: {
      teammateId: me.id,
      workspaceId: workspace.id,
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    skip,
  });

  useEffect(() => {
    if (!mountedRef.current) return;
    if (!data) return;

    setHome(data);
    setLoading(false);
  }, [data, setHome, mountedRef]);

  return {
    loading,
  };
};

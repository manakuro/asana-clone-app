import { useQuery } from '@apollo/client/react';
import { useEffect, useMemo, useState } from 'react';
import { HomePageDocument } from '@/graphql/hooks';
import { useMountedRef } from '@/hooks';
import { useHomeResponse } from '@/store/app/home';
import { useMe } from '@/store/entities/me';
import { useWorkspace } from '@/store/entities/workspace';

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

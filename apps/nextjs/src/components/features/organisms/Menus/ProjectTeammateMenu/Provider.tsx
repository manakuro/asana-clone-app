import { useSearchWorkspaceTeammatesQuery } from '@/hooks/queries/entities';
import { createProvider } from '@/shared/react/createProvider';
import { useCallback, useMemo, useState } from 'react';

const useValue = () => {
  const {
    refetch,
    teammates,
    loading: loadingQuery,
  } = useSearchWorkspaceTeammatesQuery();
  const [loadingText, setLoadingText] = useState<boolean>(false);
  const loading = useMemo(
    () => loadingText || loadingQuery,
    [loadingQuery, loadingText],
  );
  const [value, setValue] = useState<string>('');

  const onDebounce = useCallback(
    async (val: string) => {
      if (!val) return;
      console.log(val);
      await refetch({ queryText: val });
      setLoadingText(false);
    },
    [refetch],
  );

  return {
    teammates,
    loading,
    value,
    setValue,
    onDebounce,
  };
};

export const { Provider, useContext: useProjectTeammateMenuContext } =
  createProvider(
    useValue,
    '@/components/organisms/Menus/ProjectTeammateMenu/Provider.tsx',
  );

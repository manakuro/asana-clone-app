import { useCallback, useMemo, useState } from 'react';
import { useSearchWorkspaceTeammatesQuery } from '@/features/teammate/api/use-search-workspace-teammates-query';
import { createContext } from '@/lib/react/create-context';

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

export const { Context, useContext: useProjectTeammateMenuContext } =
  createContext(
    useValue,
    '@/components/organisms/Menus/ProjectTeammateMenu/context.tsx',
  );

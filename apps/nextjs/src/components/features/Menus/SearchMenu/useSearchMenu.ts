import { useSearchMenuOnKeyBindings } from '@/components/features/Menus/SearchMenu/index';
import { useDebounce } from '@/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Props<T> = {
  items: T[];
  onSelect: (item: T) => void;
  onDebounce: (val: string) => void;
  loadingQuery: boolean;
  queryText: string;
  additionalIndexLength?: number;
};

export const useSearchMenu = <T>(props: Props<T>) => {
  const {
    queryText,
    onDebounce,
    additionalIndexLength,
    loadingQuery,
    items,
    onSelect,
  } = props;

  const [loadingText, setLoadingText] = useState<boolean>(false);
  const loading = useMemo(
    () => loadingText || loadingQuery,
    [loadingQuery, loadingText],
  );
  const [value, setValue] = useState<string>('');

  const handleDebounce = useCallback(
    async (val: string) => {
      if (!val) return;
      await onDebounce(val);
      setLoadingText(false);
    },
    [onDebounce],
  );

  useSearchMenuOnKeyBindings({
    items: items,
    indexLength: items.length + (additionalIndexLength ?? 0),
    onSetValue: onSelect,
  });

  useEffect(() => {
    if (!queryText) return;
    setLoadingText(true);
    setValue(queryText);
  }, [queryText]);

  useDebounce(value, handleDebounce, 500);

  return {
    loading,
  };
};

import { useSearchMenuOnKeyBindings } from '@/components/features/Menus/SearchMenu';
import { useDebounce } from '@/hooks';
import { useSearchWorkspaceTeammatesQuery } from '@/hooks/queries/entities';
import type { Teammate } from '@/store/entities/teammate';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Props = {
  onSelect: (val: Teammate) => void;
  queryText: string;
  onClose: () => void;
  onClosed?: () => void;
  additionalIndexLength?: number;
};

export const useProjectTeammateMenu = (props: Props) => {
  const { queryText, onClose, onClosed, onSelect, additionalIndexLength } =
    props;
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

  const fetchTeammates = useCallback(
    async (val: string) => {
      await refetch({ queryText: val });
      setLoadingText(false);
    },
    [refetch],
  );

  const handleDebounce = useCallback(
    async (val: string) => {
      await fetchTeammates(val);
    },
    [fetchTeammates],
  );

  const onSelectTeammate = useCallback(
    (val: Teammate) => {
      onSelect(val);
      onClose();
      onClosed?.();
      setLoadingText(false);
    },
    [onClose, onClosed, onSelect],
  );

  useSearchMenuOnKeyBindings({
    items: teammates,
    indexLength: teammates.length + (additionalIndexLength ?? 0),
    onSetValue: onSelectTeammate,
  });

  useEffect(() => {
    setLoadingText(true);
    setValue(queryText);
  }, [queryText]);

  useDebounce(value, handleDebounce, 500);

  return {
    teammates,
    loading,
    fetchTeammates,
    onSelectTeammate,
  };
};

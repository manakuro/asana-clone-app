import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useMemo } from 'react';
import { useMe } from '@/features/me/store/me';
import { useTeammateTaskColumnCommand } from '@/features/teammate/store/teammate-task-column';
import { taskColumnIdsCustomizableState } from '../atom';

export const useMyTasksTaskColumnsCustomizable = () => {
  const { me } = useMe();
  const tasksTaskColumnIds = useAtomValue(
    useMemo(() => taskColumnIdsCustomizableState(me.id), [me.id]),
  );
  const { setTeammateTaskColumnOrder } = useTeammateTaskColumnCommand();

  const setTaskColumnOrder = useAtomCallback(
    useCallback(
      (_get, _set, updatedIds: string[]) => {
        setTeammateTaskColumnOrder(updatedIds);
      },
      [setTeammateTaskColumnOrder],
    ),
  );

  return {
    tasksTaskColumnIds,
    setTaskColumnOrder,
  };
};

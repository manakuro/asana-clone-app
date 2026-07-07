import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useMe } from '@/features/me/store/me';
import type { TaskColumnTypeValue } from '@/features/task/store/task-column';
import { teammatesTaskColumnByTypeState } from '../atom';

export const useTeammateTaskColumnByType = (type: TaskColumnTypeValue) => {
  const { me } = useMe();
  const teammatesTaskColumn = useAtomValue(
    useMemo(
      () => teammatesTaskColumnByTypeState({ teammateId: me.id, type }),
      [me.id, type],
    ),
  );

  return {
    teammatesTaskColumn,
  };
};

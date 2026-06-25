import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useMe } from '@/store/entities/me';
import type { TaskColumnTypeValue } from '@/store/entities/task-column';
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

import { useMe } from '@/store/entities/me';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskColumnIdsState } from '../atom';

export const useMyTasksTaskColumnIds = () => {
  const { me } = useMe();
  const ids = useAtomValue(useMemo(() => taskColumnIdsState(me.id), [me.id]));

  return {
    tasksTaskColumnIds: ids,
  };
};

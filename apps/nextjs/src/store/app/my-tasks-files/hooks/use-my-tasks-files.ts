import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useMe } from '@/store/entities/me';
import { taskFileIdsState } from '../atom';

export const useMyTasksFiles = () => {
  const { me } = useMe();
  const ids = useAtomValue(useMemo(() => taskFileIdsState(me.id), [me.id]));
  const taskFileIds = useMemo(() => ids, [ids]);

  return {
    taskFileIds,
  };
};

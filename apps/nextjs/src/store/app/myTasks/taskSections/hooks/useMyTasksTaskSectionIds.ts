import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useMe } from '@/store/entities/me';
import { taskSectionIdsState } from '../atom';

export const useMyTasksTaskSectionIds = () => {
  const { me } = useMe();
  const ids = useAtomValue(useMemo(() => taskSectionIdsState(me.id), [me.id]));
  const taskSectionIds = useMemo(() => ids, [ids]);

  return {
    taskSectionIds,
  };
};

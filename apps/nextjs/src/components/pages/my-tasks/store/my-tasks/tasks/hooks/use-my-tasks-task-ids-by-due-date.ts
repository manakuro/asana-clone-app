import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskIdsByDueDateState } from '../atom';

export const useMyTasksTaskIdsByDueDate = (dueDate: string) => {
  const ids = useAtomValue(
    useMemo(() => taskIdsByDueDateState({ dueDate }), [dueDate]),
  );
  const taskIds = useMemo(() => ids, [ids]);

  return {
    taskIds,
  };
};

import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import type { ProjectTaskListStatus } from '@/store/app/projects/taskListStatus';
import { taskListStatusState } from '../atom';

export const useTaskListStatusCommand = () => {
  const setTaskListCompletedStatus = useAtomCallback(
    useCallback(
      (
        get,
        set,
        input: Partial<ProjectTaskListStatus['taskListCompletedStatus']>,
      ) => {
        const prev = get(taskListStatusState);
        set(taskListStatusState, {
          ...prev,
          taskListCompletedStatus: {
            ...prev.taskListCompletedStatus,
            ...input,
          },
        });
      },
      [],
    ),
  );

  const setTaskListSortStatus = useAtomCallback(
    useCallback(
      (
        get,
        set,
        input: Partial<ProjectTaskListStatus['taskListSortStatus']>,
      ) => {
        const prev = get(taskListStatusState);
        set(taskListStatusState, {
          ...prev,
          taskListSortStatus: {
            ...prev.taskListSortStatus,
            ...input,
          },
        });
      },
      [],
    ),
  );

  return {
    setTaskListCompletedStatus,
    setTaskListSortStatus,
  };
};

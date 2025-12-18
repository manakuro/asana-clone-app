import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { type TaskResponse, useTasksResponse } from '@/store/entities/task';
import { teammateTaskState } from '../atom';
import type { TeammateTaskResponse } from '../type';

export const useTeammateTaskResponse = () => {
  const { setTasksFromResponse } = useTasksResponse();

  const setTeammateTask = useAtomCallback(
    useCallback(
      (
        get,
        set,
        data: TeammateTaskResponse[],
        options?: { includeTask?: boolean },
      ) => {
        const includeTask = options?.includeTask ?? true;

        data.forEach((d) => {
          const prev = get(teammateTaskState(d.id));
          set(teammateTaskState(d.id), {
            ...prev,
            ...d,
          });
        });

        if (!includeTask) return;

        const tasks = data.map<TaskResponse>((d) => d.task);
        setTasksFromResponse(tasks);
      },
      [setTasksFromResponse],
    ),
  );

  return {
    setTeammateTask,
  };
};

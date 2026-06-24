import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { useTeammateTaskCommand } from '@/store/entities/teammateTask';

export const useMyTasksTask = () => {
  const { addTeammateTask, setTeammateTaskByTaskId } = useTeammateTaskCommand();

  const addTask = useAtomCallback(
    useCallback(
      (_get, _set, input: { taskSectionId: string }) => {
        return addTeammateTask({ teammateTaskSectionId: input.taskSectionId });
      },
      [addTeammateTask],
    ),
  );

  const setTaskSectionId = useAtomCallback(
    useCallback(
      async (_get, _set, input: { taskSectionId: string; taskId: string }) => {
        await setTeammateTaskByTaskId(input.taskId, {
          teammateTaskSectionId: input.taskSectionId,
        });
      },
      [setTeammateTaskByTaskId],
    ),
  );

  return {
    addTask,
    setTaskSectionId,
  };
};

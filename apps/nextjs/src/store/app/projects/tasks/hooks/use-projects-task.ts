import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { useProjectTaskCommand } from '@/store/entities/projectTask';

export const useProjectsTask = () => {
  const { addProjectTask, setProjectTaskByTaskId } = useProjectTaskCommand();
  const { projectId } = useProjectsProjectId();

  const addTask = useAtomCallback(
    useCallback(
      (_get, _set, input: { taskSectionId: string }) => {
        return addProjectTask({
          projectId,
          projectTaskSectionId: input.taskSectionId,
        });
      },
      [addProjectTask, projectId],
    ),
  );

  const setTaskSectionId = useAtomCallback(
    useCallback(
      async (_get, _set, input: { taskSectionId: string; taskId: string }) => {
        await setProjectTaskByTaskId(
          { taskId: input.taskId, projectId },
          {
            projectTaskSectionId: input.taskSectionId,
          },
        );
      },
      [projectId, setProjectTaskByTaskId],
    ),
  );

  return {
    addTask,
    setTaskSectionId,
  };
};

import {
  useCreateProjectTaskByTaskIdMutation,
  useCreateProjectTaskMutation,
  useDeleteProjectTaskMutation,
  useUpdateProjectTaskMutation,
} from '@/graphql/hooks';
import { uuid } from '@/shared/uuid';
import { useMe } from '@/store/entities/me';
import {
  taskOptimisticState,
  taskState,
  useTaskCommand,
} from '@/store/entities/task';
import { useWorkspace } from '@/store/entities/workspace';
import { useAtomCallback } from 'jotai/utils';
import { RESET } from 'jotai/utils';
import { useCallback } from 'react';
import {
  initialState,
  projectTaskByTaskIdAndProjectIdState,
  projectTaskByTaskIdState,
  projectTaskState,
} from '../atom';
import type { ProjectTask, ProjectTaskResponse } from '../type';
import { PROJECT_TASK_CREATED_BY_TASK_ID_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskCreatedByTaskIdSubscription';
import { PROJECT_TASK_CREATED_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskCreatedSubscription';
import { PROJECT_TASK_DELETED_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskDeletedSubscription';
import { useProjectTaskResponse } from './useProjectTaskResponse';
import { PROJECT_TASK_UPDATED_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskUpdatedSubscription';
import { useResetProjectTask } from './useResetProjectTask';
import { useUpsert } from './useUpsert';

type AddProjectTaskInput = Partial<ProjectTask> & {
  projectId: string;
  projectTaskSectionId: string;
  taskParentId?: string;
};

export const useProjectTaskCommand = () => {
  const { addTask } = useTaskCommand();
  const [createProjectTaskMutation] = useCreateProjectTaskMutation();
  const [createProjectTaskByTaskIdMutation] =
    useCreateProjectTaskByTaskIdMutation();
  const [updateProjectTaskMutation] = useUpdateProjectTaskMutation();
  const [deleteProjectTaskMutation] = useDeleteProjectTaskMutation();

  const { me } = useMe();
  const { workspace } = useWorkspace();
  const { setProjectTask: setProjectTaskResponse } = useProjectTaskResponse();
  const { upsert } = useUpsert();
  const { resetProjectTask } = useResetProjectTask();

  const resetTask = useAtomCallback(
    useCallback((_, set, params: { taskId: string; projectTaskId: string }) => {
      set(projectTaskState(params.projectTaskId), RESET);
      set(taskState(params.taskId), RESET);
    }, []),
  );

  const setProjectTask = useAtomCallback(
    useCallback(
      async (
        get,
        set,
        input: Override<Partial<ProjectTask>, { id: string }>,
      ) => {
        const prev = get(projectTaskState(input.id));
        upsert({ ...prev, ...input });

        const restore = () => {
          upsert(prev);
        };

        try {
          const res = await updateProjectTaskMutation({
            variables: {
              input: {
                ...input,
                id: prev.id,
                workspaceId: workspace.id,
                requestId: PROJECT_TASK_UPDATED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.errors) {
            restore();
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
      [updateProjectTaskMutation, upsert, workspace.id],
    ),
  );

  const setProjectTaskByTaskId = useAtomCallback(
    useCallback(
      async (
        get,
        set,
        { taskId, projectId }: { taskId: string; projectId: string },
        input: Partial<ProjectTask>,
      ) => {
        const prev = get(
          projectTaskByTaskIdAndProjectIdState({ taskId, projectId }),
        );
        upsert({ ...prev, ...input });

        const restore = () => {
          upsert(prev);
        };

        try {
          const res = await updateProjectTaskMutation({
            variables: {
              input: {
                ...input,
                id: prev.id,
                workspaceId: workspace.id,
                requestId: PROJECT_TASK_UPDATED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.errors) {
            restore();
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
      [updateProjectTaskMutation, upsert, workspace.id],
    ),
  );

  const addProjectTaskOptimistic = useAtomCallback(
    useCallback(
      (_, __, input: AddProjectTaskInput) => {
        const newProjectTaskId = uuid();
        const newTaskId = addTask({
          taskParentId: input.taskParentId || '',
        });
        const newProjectTask = {
          ...initialState(),
          ...input,
          id: newProjectTaskId,
          taskId: newTaskId,
        };

        upsert(newProjectTask);

        return {
          newProjectTask,
          newProjectTaskId,
          newTaskId,
        };
      },
      [addTask, upsert],
    ),
  );

  const addProjectTask = useAtomCallback(
    useCallback(
      async (get, set, input: AddProjectTaskInput) => {
        const { newTaskId, newProjectTask, newProjectTaskId } =
          addProjectTaskOptimistic(input);

        const restore = () => {
          resetTask({ taskId: newTaskId, projectTaskId: newProjectTaskId });
        };

        try {
          const res = await createProjectTaskMutation({
            variables: {
              input: {
                projectId: newProjectTask.projectId,
                projectTaskSectionId: newProjectTask.projectTaskSectionId,
                createdBy: me.id,
                taskParentId: input.taskParentId ?? null,
                requestId: PROJECT_TASK_CREATED_SUBSCRIPTION_REQUEST_ID,
                workspaceId: workspace.id,
              },
            },
          });
          if (res.errors) {
            restore();
            return '';
          }

          const addedProjectTask = res.data?.createProjectTask;
          if (!addedProjectTask) return '';

          const optimisticTask = get(taskOptimisticState(newTaskId));
          resetTask({ taskId: newTaskId, projectTaskId: newProjectTaskId });
          set(taskOptimisticState(newTaskId), RESET);
          taskOptimisticState.remove(newTaskId);

          setProjectTaskResponse([
            {
              ...addedProjectTask,
              task: {
                ...addedProjectTask.task,
                name: optimisticTask.name,
              },
            },
          ]);

          return addedProjectTask.id;
        } catch (e) {
          restore();
          throw e;
        }
      },
      [
        addProjectTaskOptimistic,
        createProjectTaskMutation,
        me.id,
        workspace.id,
        resetTask,
        setProjectTaskResponse,
      ],
    ),
  );

  const addProjectTaskByTaskId = useAtomCallback(
    useCallback(
      async (get, set, input: { projectId: string; taskId: string }) => {
        const projectTask = get(
          projectTaskByTaskIdAndProjectIdState({
            projectId: input.projectId,
            taskId: input.taskId,
          }),
        );
        if (projectTask.id) return;

        const newProjectTaskId = uuid();
        upsert({
          ...initialState(),
          taskId: input.taskId,
          projectId: input.projectId,
          id: newProjectTaskId,
        });

        const restore = () => {
          resetProjectTask(newProjectTaskId);
        };

        try {
          const res = await createProjectTaskByTaskIdMutation({
            variables: {
              input: {
                projectId: input.projectId,
                taskId: input.taskId,
                requestId:
                  PROJECT_TASK_CREATED_BY_TASK_ID_SUBSCRIPTION_REQUEST_ID,
                workspaceId: workspace.id,
              },
            },
          });
          if (res.errors) {
            restore();
            return '';
          }

          const addedProjectTask = res.data?.createProjectTaskByTaskId;
          if (!addedProjectTask) return '';

          resetProjectTask(newProjectTaskId);
          setProjectTaskResponse([addedProjectTask]);

          return addedProjectTask.id;
        } catch (e) {
          restore();
          throw e;
        }
      },
      [
        createProjectTaskByTaskIdMutation,
        resetProjectTask,
        setProjectTaskResponse,
        upsert,
        workspace.id,
      ],
    ),
  );

  const deleteProjectTask = useAtomCallback(
    useCallback(
      async (get, set, input: { id: string }) => {
        const projectTask = get(projectTaskState(input.id));

        resetProjectTask(projectTask.id);

        const restore = () => {
          setProjectTaskResponse([projectTask as ProjectTaskResponse], {
            includeTask: false,
          });
        };

        try {
          const res = await deleteProjectTaskMutation({
            variables: {
              input: {
                id: projectTask.id,
                workspaceId: workspace.id,
                requestId: PROJECT_TASK_DELETED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });

          if (res.errors) {
            restore();
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
      [
        deleteProjectTaskMutation,
        resetProjectTask,
        setProjectTaskResponse,
        workspace.id,
      ],
    ),
  );

  const deleteProjectTaskByTaskId = useAtomCallback(
    useCallback(
      async (get, set, input: { taskId: string }) => {
        const projectTask = get(projectTaskByTaskIdState(input.taskId));

        resetProjectTask(projectTask.id);

        const restore = () => {
          setProjectTaskResponse([projectTask as ProjectTaskResponse], {
            includeTask: false,
          });
        };

        try {
          const res = await deleteProjectTaskMutation({
            variables: {
              input: {
                id: projectTask.id,
                workspaceId: workspace.id,
                requestId: PROJECT_TASK_DELETED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });

          if (res.errors) {
            restore();
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
      [
        deleteProjectTaskMutation,
        resetProjectTask,
        setProjectTaskResponse,
        workspace.id,
      ],
    ),
  );

  return {
    addProjectTask,
    addProjectTaskByTaskId,
    setProjectTaskByTaskId,
    setProjectTask,
    deleteProjectTaskByTaskId,
    deleteProjectTask,
  };
};

import { useMutation } from '@apollo/client/react';
import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback, useRef } from 'react';
import {
  AssignTaskDocument,
  CreateTaskDocument,
  DeleteTaskDocument,
  UnassignTaskDocument,
  UndeleteTaskDocument,
} from '@/graphql/hooks';
import { uuid } from '@/shared/uuid';
import {
  type DeletedTaskResponse,
  deletedTasksByTaskIdState,
  useDeletedTaskResponse,
  useResetDeletedTask,
} from '@/store/entities/deletedTask';
import { useMe } from '@/store/entities/me';
import {
  type ProjectTaskResponse,
  projectTasksByTaskIdState,
  useProjectTaskResponse,
  useResetProjectTask,
} from '@/store/entities/projectTask';
import type { Task } from '@/store/entities/task';
import {
  type TeammateTaskResponse,
  teammateTaskByTaskIdState,
  teammateTaskState,
  useResetTeammateTask,
  useTeammateTaskResponse,
} from '@/store/entities/teammateTask';
import { useWorkspace } from '@/store/entities/workspace';
import { initialState, taskState } from '../atom';
import { useResetTask } from './useResetTask';
import { TASK_ASSIGNED_SUBSCRIPTION_REQUEST_ID } from './useTaskAssignedSubscription';
import { TASK_DELETED_SUBSCRIPTION_REQUEST_ID } from './useTaskDeletedSubscription';
import { useTasksResponse } from './useTaskResponse';
import { TASK_UNASSIGNED_SUBSCRIPTION_REQUEST_ID } from './useTaskUnassignedSubscription';
import { TASK_UNDELETED_SUBSCRIPTION_REQUEST_ID } from './useTaskUndeletedSubscription';
import { useUpsert } from './useUpsert';

export const useTaskCommand = () => {
  const { upsert } = useUpsert();
  const { resetTask } = useResetTask();
  const { setTasksFromResponse } = useTasksResponse();
  const { me } = useMe();
  const { workspace } = useWorkspace();
  const [deleteTaskMutation] = useMutation(DeleteTaskDocument);
  const [undeleteTaskMutation] = useMutation(UndeleteTaskDocument);
  const [assignTaskMutation] = useMutation(AssignTaskDocument);
  const [unassignTaskMutation] = useMutation(UnassignTaskDocument);
  const [createTaskMutation] = useMutation(CreateTaskDocument);
  const { setTeammateTask } = useTeammateTaskResponse();
  const { resetTeammateTask } = useResetTeammateTask();
  const { setProjectTask } = useProjectTaskResponse();
  const { setDeletedTask } = useDeletedTaskResponse();
  const { resetProjectTasks } = useResetProjectTask();
  const { resetDeletedTask } = useResetDeletedTask();

  const setTaskById = useAtomCallback(
    useCallback(async (get, set, taskId: string, input: Partial<Task>) => {
      const prev = get(taskState(taskId));
      const updated = { ...prev, ...input };
      const prevValue = get(taskState(taskId));
      set(taskState(taskId), {
        ...prevValue,
        ...updated,
      });
    }, []),
  );

  const unassignTask = useAtomCallback(
    useCallback(
      async (get, _set, input: { id: string }) => {
        const prev = get(taskState(input.id));
        setTaskById(input.id, { assigneeId: '' });

        const restore = () => {
          setTaskById(input.id, prev);
        };

        try {
          const res = await unassignTaskMutation({
            variables: {
              input: {
                id: input.id,
                workspaceId: workspace.id,
                requestId: TASK_UNASSIGNED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.error) {
            restore();
            return;
          }
          const data = res.data?.unassignTask;
          if (!data) return;

          resetTeammateTask(data.teammateTaskId);
        } catch (e) {
          restore();
          throw e;
        }
      },
      [resetTeammateTask, setTaskById, unassignTaskMutation, workspace.id],
    ),
  );

  const assignTask = useAtomCallback(
    useCallback(
      async (get, _set, input: { id: string; assigneeId: string }) => {
        const prev = get(taskState(input.id));

        if (
          prev.assigneeId &&
          input.assigneeId &&
          prev.assigneeId === input.assigneeId
        )
          return;

        setTaskById(input.id, { assigneeId: input.assigneeId });

        const restore = () => {
          setTaskById(input.id, prev);
        };

        try {
          const res = await assignTaskMutation({
            variables: {
              input: {
                id: input.id,
                assigneeId: input.assigneeId,
                workspaceId: workspace.id,
                requestId: TASK_ASSIGNED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.error) {
            restore();
            return;
          }
          const data = res.data?.assignTask;
          if (!data) return;

          setTeammateTask([data.teammateTask]);
        } catch (e) {
          restore();
          throw e;
        }
      },
      [assignTaskMutation, setTaskById, setTeammateTask, workspace.id],
    ),
  );

  const addTask = useCallback(
    (val?: Partial<Task>) => {
      const id = uuid();
      upsert({
        ...initialState(),
        ...val,
        id,
        isNew: true,
        createdBy: me.id,
      });

      return id;
    },
    [me.id, upsert],
  );

  const addSubtask = useCallback(
    async (input: { taskParentId: string }) => {
      const newTaskId = addTask({
        taskParentId: input.taskParentId,
      });

      const restore = () => {
        resetTask(newTaskId);
      };

      try {
        const res = await createTaskMutation({
          variables: {
            input: {
              createdBy: me.id,
              taskParentId: input.taskParentId,
              workspaceId: workspace.id,
              requestId: '',
            },
          },
        });
        if (res.error) {
          restore();
          return '';
        }

        const data = res.data?.createTask;
        if (!data) return '';

        resetTask(newTaskId);
        setTasksFromResponse([data]);
      } catch (e) {
        restore();
        throw e;
      }
    },
    [
      addTask,
      createTaskMutation,
      me.id,
      resetTask,
      setTasksFromResponse,
      workspace.id,
    ],
  );

  const isDeletingTask = useRef<boolean>(false);
  const deleteTask = useAtomCallback(
    useCallback(
      async (get, set, input: { taskId: string }) => {
        if (isDeletingTask.current) return;

        isDeletingTask.current = true;

        const teammateTask = get(teammateTaskByTaskIdState(input.taskId));
        if (teammateTask.id) {
          set(teammateTaskState(teammateTask.id), RESET);
        }

        const projectTasks = get(projectTasksByTaskIdState(input.taskId));
        if (projectTasks.length) {
          resetProjectTasks(projectTasks.map((p) => p.id));
        }

        const restore = () => {
          if (teammateTask.id)
            setTeammateTask([teammateTask as TeammateTaskResponse]);
          if (projectTasks.length)
            setProjectTask(projectTasks as ProjectTaskResponse[]);
        };

        try {
          const res = await deleteTaskMutation({
            variables: {
              input: {
                taskId: input.taskId,
                workspaceId: workspace.id,
                requestId: TASK_DELETED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.error) {
            restore();
            return;
          }

          const data = res.data?.deleteTask?.deletedTask;
          if (!data) return;

          setDeletedTask([data], { includeTask: false });
        } catch (e) {
          restore();
          throw e;
        } finally {
          isDeletingTask.current = false;
        }
      },
      [
        deleteTaskMutation,
        resetProjectTasks,
        setDeletedTask,
        setProjectTask,
        setTeammateTask,
        workspace.id,
      ],
    ),
  );

  const undeleteTask = useAtomCallback(
    useCallback(
      async (get, _set, input: { taskId: string }) => {
        const deletedTasks = get(deletedTasksByTaskIdState(input.taskId));
        deletedTasks.forEach((d) => {
          resetDeletedTask(d.id);
        });

        const restore = () => {
          setDeletedTask(deletedTasks as DeletedTaskResponse[]);
        };

        try {
          const res = await undeleteTaskMutation({
            variables: {
              input: {
                taskId: input.taskId,
                workspaceId: workspace.id,
                requestId: TASK_UNDELETED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.error) {
            restore();
            return;
          }

          const teammateTask = res.data?.undeleteTask?.teammateTask;
          if (teammateTask) setTeammateTask([teammateTask]);

          const projectTasks = res.data?.undeleteTask?.projectTasks;
          if (projectTasks?.length)
            setProjectTask(projectTasks, { includeTask: false });
        } catch (e) {
          restore();
          throw e;
        }
      },
      [
        resetDeletedTask,
        setDeletedTask,
        setProjectTask,
        setTeammateTask,
        undeleteTaskMutation,
        workspace.id,
      ],
    ),
  );

  return {
    addTask,
    assignTask,
    unassignTask,
    setTaskById,
    deleteTask,
    undeleteTask,
    addSubtask,
  };
};

import { useMutation } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import {
  CreateTaskCollaboratorDocument,
  DeleteTaskCollaboratorDocument,
} from '@/graphql/hooks';
import type { TaskCollaboratorResponse } from '@/graphql/types/taskCollaborator';
import { uuid } from '@/shared/uuid';
import {
  type Teammate,
  useResetTeammate,
  useTeammateResponse,
} from '@/store/entities/teammate';
import { useWorkspace } from '@/store/entities/workspace';
import { initialState, taskCollaboratorByTaskIdAndTeammateId } from '../atom';
import { useResetTaskCollaborator } from './useResetTaskCollaborator';
import { TASK_COLLABORATOR_CREATED_SUBSCRIPTION_REQUEST_ID } from './useTaskCollaboratorCreatedSubscription';
import { TASK_COLLABORATOR_DELETED_SUBSCRIPTION_REQUEST_ID } from './useTaskCollaboratorDeletedSubscription';
import { useTaskCollaboratorResponse } from './useTaskCollaboratorResponse';
import { useUpsert } from './useUpsert';

export const useTaskCollaboratorCommand = () => {
  const { upsert } = useUpsert();
  const { resetTaskCollaborator } = useResetTaskCollaborator();
  const { setTaskCollaborators } = useTaskCollaboratorResponse();
  const { setTeammates } = useTeammateResponse();
  const { resetTeammate } = useResetTeammate();
  const { workspace } = useWorkspace();

  const [createTaskCollaboratorMutation] = useMutation(
    CreateTaskCollaboratorDocument,
  );
  const [deleteTaskCollaboratorMutation] = useMutation(
    DeleteTaskCollaboratorDocument,
  );

  const addTaskCollaboratorByTeammate = useAtomCallback(
    useCallback(
      async (get, _set, input: { taskId: string; teammate: Teammate }) => {
        const taskCollaborator = get(
          taskCollaboratorByTaskIdAndTeammateId({
            teammateId: input.teammate.id,
            taskId: input.taskId,
          }),
        );
        if (taskCollaborator.id) return;

        const id = uuid();
        upsert({
          ...initialState(),
          id,
          taskId: input.taskId,
          teammateId: input.teammate.id,
        });

        setTeammates([input.teammate]);

        const restore = () => {
          resetTaskCollaborator(id);
          resetTeammate(input.teammate.id);
        };

        try {
          const res = await createTaskCollaboratorMutation({
            variables: {
              input: {
                taskId: input.taskId,
                teammateId: input.teammate.id,
                workspaceId: workspace.id,
                requestId: TASK_COLLABORATOR_CREATED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.error) {
            restore();
            return;
          }

          const data = res.data?.createTaskCollaborator;
          if (!data) return;

          resetTaskCollaborator(id);
          setTaskCollaborators([data]);
        } catch (e) {
          restore();
          throw e;
        }
      },
      [
        createTaskCollaboratorMutation,
        resetTaskCollaborator,
        resetTeammate,
        setTaskCollaborators,
        setTeammates,
        upsert,
        workspace.id,
      ],
    ),
  );

  const deleteTaskCollaboratorByTeammate = useAtomCallback(
    useCallback(
      async (get, _set, input: { taskId: string; teammateId: string }) => {
        const taskCollaborator = get(
          taskCollaboratorByTaskIdAndTeammateId({
            taskId: input.taskId,
            teammateId: input.teammateId,
          }),
        );

        resetTaskCollaborator(taskCollaborator.id);

        const restore = () => {
          setTaskCollaborators([taskCollaborator as TaskCollaboratorResponse]);
        };

        try {
          const res = await deleteTaskCollaboratorMutation({
            variables: {
              input: {
                id: taskCollaborator.id,
                workspaceId: workspace.id,
                requestId: TASK_COLLABORATOR_DELETED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.error) {
            restore();
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
      [
        deleteTaskCollaboratorMutation,
        resetTaskCollaborator,
        setTaskCollaborators,
        workspace.id,
      ],
    ),
  );

  return {
    addTaskCollaboratorByTeammate,
    deleteTaskCollaboratorByTeammate,
  };
};

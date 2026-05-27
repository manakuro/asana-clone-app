import { useMutation } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { CreateTaskTagDocument, DeleteTaskTagDocument } from '@/graphql/hooks';
import { uuid } from '@/shared/uuid';
import type { Tag } from '@/store/entities/tag';
import {
  taskTagByTaskIdAndTagIdState,
  taskTagState,
} from '@/store/entities/taskTag';
import { useWorkspace } from '@/store/entities/workspace';
import { initialState } from '../atom';
import { useResetTaskTag } from './useResetTaskTag';
import { TASK_TAG_CREATED_SUBSCRIPTION_REQUEST_ID } from './useTaskTagCreatedSubscription';
import { TASK_TAG_DELETED_SUBSCRIPTION_REQUEST_ID } from './useTaskTagDeletedSubscription';
import { useTaskTagResponse } from './useTaskTagResponse';

export const useTaskTagCommand = () => {
  const [createTaskTagMutation] = useMutation(CreateTaskTagDocument);
  const [deleteTaskTagMutation] = useMutation(DeleteTaskTagDocument);
  const { setTaskTag } = useTaskTagResponse();
  const { resetTaskTag } = useResetTaskTag();
  const { workspace } = useWorkspace();

  const addTaskTag = useAtomCallback(
    useCallback(
      async (get, set, input: { tag: Tag; taskId: string }) => {
        const taskTag = get(
          taskTagByTaskIdAndTagIdState({
            taskId: input.taskId,
            tagId: input.tag.id,
          }),
        );
        if (taskTag.id) return;

        const id = uuid();
        const newTaskTag = {
          ...initialState(),
          id,
          tagId: input.tag.id,
          tag: input.tag,
          taskId: input.taskId,
        };
        set(taskTagState(id), newTaskTag);

        const restore = () => {
          resetTaskTag(id);
        };

        try {
          const res = await createTaskTagMutation({
            variables: {
              input: {
                tagId: input.tag.id,
                taskId: input.taskId,
                workspaceId: workspace.id,
                requestId: TASK_TAG_CREATED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.error) {
            restore();
            return;
          }

          const data = res.data?.createTaskTag;
          if (!data) return;

          resetTaskTag(id);
          await setTaskTag([data]);
        } catch (e) {
          restore();
          throw e;
        }
      },
      [createTaskTagMutation, resetTaskTag, setTaskTag, workspace.id],
    ),
  );

  const deleteTaskTag = useAtomCallback(
    useCallback(
      async (get, _set, input: { id: string }) => {
        const prev = get(taskTagState(input.id));

        resetTaskTag(input.id);

        const restore = () => {
          setTaskTag([prev]);
        };

        try {
          const res = await deleteTaskTagMutation({
            variables: {
              input: {
                id: input.id,
                workspaceId: workspace.id,
                requestId: TASK_TAG_DELETED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.error) {
            restore();
            return;
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
      [deleteTaskTagMutation, resetTaskTag, setTaskTag, workspace.id],
    ),
  );

  return {
    addTaskTag,
    deleteTaskTag,
  };
};

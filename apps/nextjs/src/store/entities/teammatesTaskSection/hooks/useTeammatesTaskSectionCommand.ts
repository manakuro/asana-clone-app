import { useMutation } from '@apollo/client/react';
import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import {
  CreateTeammateTaskSectionDocument,
  DeleteTeammateTaskSectionAndDeleteTasksDocument,
  DeleteTeammateTaskSectionAndKeepTasksDocument,
  DeleteTeammateTaskSectionDocument,
  UndeleteTeammateTaskSectionAndDeleteTasksDocument,
  UndeleteTeammateTaskSectionAndKeepTasksDocument,
} from '@/graphql/hooks';
import { uuid } from '@/shared/uuid';
import { useMe } from '@/store/entities/me';
import {
  type TeammateTaskResponse,
  teammateTaskByTeammateTaskSectionIdState,
  teammateTasksByIdsState,
  useResetTeammateTask,
  useTeammateTaskResponse,
} from '@/store/entities/teammateTask';
import { useWorkspace } from '@/store/entities/workspace';
import { initialState, teammatesTaskSectionState } from '../atom';
import type {
  DeleteTeammateTaskSectionAndDeleteTasksMutation,
  DeleteTeammateTaskSectionAndKeepTasksMutation,
  TeammateTaskSection,
  TeammateTaskSectionResponse,
} from '../type';
import { useResetTeammateTaskSection } from './useResetTeammateTaskSection';
import { useTeammatesTaskSectionResponse } from './useTeammatesTaskSectionResponse';
import { TEAMMATE_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskSectionCreatedSubscription';
import { TEAMMATE_TASK_SECTION_DELETED_AND_DELETE_TASKS_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskSectionDeletedAndDeleteTasksSubscription';
import { TEAMMATE_TASK_SECTION_DELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskSectionDeletedAndKeepTasksSubscription';
import { TEAMMATE_TASK_SECTION_DELETED_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskSectionDeletedSubscription';
import { TEAMMATE_TASK_SECTION_UNDELETED_AND_DELETE_TASKS_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskSectionUndeletedAndDeleteTasksSubscription';
import { TEAMMATE_TASK_SECTION_UNDELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskSectionUndeletedAndKeepTasksSubscription';
import { useUpsert } from './useUpsert';

export const useTeammatesTaskSectionCommand = () => {
  const { upsert } = useUpsert();
  const { me } = useMe();
  const { workspace } = useWorkspace();
  const [createTeammateTaskSectionMutation] = useMutation(
    CreateTeammateTaskSectionDocument,
  );
  const { setTeammatesTaskSections } = useTeammatesTaskSectionResponse();
  const { resetTeammateTaskSection } = useResetTeammateTaskSection();

  const [deleteTeammateTaskSectionAndKeepTasksMutation] = useMutation(
    DeleteTeammateTaskSectionAndKeepTasksDocument,
  );

  const [deleteTeammateTaskSectionAndDeleteTasksMutation] = useMutation(
    DeleteTeammateTaskSectionAndDeleteTasksDocument,
  );

  const [deleteTeammateTaskSectionMutation] = useMutation(
    DeleteTeammateTaskSectionDocument,
  );

  const [undeleteTeammateTaskSectionAndKeepTasksMutation] = useMutation(
    UndeleteTeammateTaskSectionAndKeepTasksDocument,
  );

  const [undeleteTeammateTaskSectionAndDeleteTasksMutation] = useMutation(
    UndeleteTeammateTaskSectionAndDeleteTasksDocument,
  );

  const { setTeammateTask } = useTeammateTaskResponse();
  const { resetTeammateTasks } = useResetTeammateTask();

  const addTeammatesTaskSection = useAtomCallback(
    useCallback(
      async (_get, set, val?: Partial<TeammateTaskSection>) => {
        const id = uuid();
        upsert({
          ...initialState(),
          ...val,
          isNew: true,
          id,
        });

        const restore = () => {
          set(teammatesTaskSectionState(id), RESET);
        };

        try {
          const res = await createTeammateTaskSectionMutation({
            variables: {
              input: {
                teammateId: me.id,
                workspaceId: workspace.id,
                requestId:
                  TEAMMATE_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.error) {
            restore();
            return '';
          }

          const addedTeammateTaskSection = res.data?.createTeammateTaskSection;
          if (!addedTeammateTaskSection) return '';

          set(teammatesTaskSectionState(id), RESET);
          setTeammatesTaskSections([
            {
              ...addedTeammateTaskSection,
              isNew: true,
            },
          ]);

          return addedTeammateTaskSection.id;
        } catch (e) {
          restore();
          throw e;
        }
      },
      [
        createTeammateTaskSectionMutation,
        me.id,
        setTeammatesTaskSections,
        upsert,
        workspace.id,
      ],
    ),
  );

  const deleteTaskSectionAndKeepTasks = useAtomCallback(
    useCallback(
      async (get, _set, id: string) => {
        const teammateTasks = get(teammateTaskByTeammateTaskSectionIdState(id));

        resetTeammateTaskSection(id);

        const restore = () => {
          const prev = get(teammatesTaskSectionState(id));
          setTeammateTask(teammateTasks as TeammateTaskResponse[]);
          setTeammatesTaskSections([prev] as TeammateTaskSectionResponse[]);
        };

        try {
          const res = await deleteTeammateTaskSectionAndKeepTasksMutation({
            variables: {
              input: {
                id,
                workspaceId: workspace.id,
                requestId:
                  TEAMMATE_TASK_SECTION_DELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.error) {
            restore();
            return;
          }

          const teammateTaskSection =
            res.data?.deleteTeammateTaskSectionAndKeepTasks
              .keptTeammateTaskSection;
          if (!teammateTaskSection) return;

          const newTeammateTasks = teammateTasks.map((t: any) => ({
            ...t,
            teammateTaskSectionId: teammateTaskSection.id,
          }));
          setTeammateTask(newTeammateTasks as TeammateTaskResponse[], {
            includeTask: false,
          });

          return res.data;
        } catch (e) {
          restore();
          throw e;
        }
      },
      [
        deleteTeammateTaskSectionAndKeepTasksMutation,
        resetTeammateTaskSection,
        setTeammateTask,
        setTeammatesTaskSections,
        workspace.id,
      ],
    ),
  );

  const deleteTaskSectionAndDeleteTasks = useAtomCallback(
    useCallback(
      async (get, _set, id: string) => {
        const teammateTasks = get(teammateTaskByTeammateTaskSectionIdState(id));
        const teammateTaskIds = teammateTasks.map((t: any) => t.id);

        resetTeammateTaskSection(id);
        resetTeammateTasks(teammateTaskIds);

        const restore = () => {
          const prev = get(teammatesTaskSectionState(id));
          setTeammateTask(teammateTasks as TeammateTaskResponse[]);
          setTeammatesTaskSections([prev] as TeammateTaskSectionResponse[]);
        };

        try {
          const res = await deleteTeammateTaskSectionAndDeleteTasksMutation({
            variables: {
              input: {
                id,
                workspaceId: workspace.id,
                requestId:
                  TEAMMATE_TASK_SECTION_DELETED_AND_DELETE_TASKS_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.error) {
            restore();
            return;
          }

          return res.data;
        } catch (e) {
          restore();
          throw e;
        }
      },
      [
        deleteTeammateTaskSectionAndDeleteTasksMutation,
        resetTeammateTaskSection,
        resetTeammateTasks,
        setTeammateTask,
        setTeammatesTaskSections,
        workspace.id,
      ],
    ),
  );

  const deleteTeammateTaskSection = useAtomCallback(
    useCallback(
      async (get, _set, id: string) => {
        resetTeammateTaskSection(id);

        const restore = () => {
          const prev = get(teammatesTaskSectionState(id));
          setTeammatesTaskSections([prev] as TeammateTaskSectionResponse[]);
        };

        try {
          const res = await deleteTeammateTaskSectionMutation({
            variables: {
              input: {
                id,
                workspaceId: workspace.id,
                requestId:
                  TEAMMATE_TASK_SECTION_DELETED_SUBSCRIPTION_REQUEST_ID,
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
        deleteTeammateTaskSectionMutation,
        resetTeammateTaskSection,
        setTeammatesTaskSections,
        workspace.id,
      ],
    ),
  );

  const undeleteTaskSectionAndKeepTasks = useAtomCallback(
    useCallback(
      async (
        get,
        _set,
        input: DeleteTeammateTaskSectionAndKeepTasksMutation,
      ) => {
        const teammateTaskSection =
          input.deleteTeammateTaskSectionAndKeepTasks.teammateTaskSection;
        const teammateTaskIds =
          input.deleteTeammateTaskSectionAndKeepTasks.teammateTaskIds;

        try {
          const res = await undeleteTeammateTaskSectionAndKeepTasksMutation({
            variables: {
              input: {
                name: teammateTaskSection.name,
                teammateId: teammateTaskSection.teammateId,
                workspaceId: teammateTaskSection.workspaceId,
                createdAt: teammateTaskSection.createdAt,
                updatedAt: teammateTaskSection.updatedAt,
                keptTeammateTaskIds: teammateTaskIds,
                requestId:
                  TEAMMATE_TASK_SECTION_UNDELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.error) {
            return;
          }

          const data = res.data?.undeleteTeammateTaskSectionAndKeepTasks;
          if (!data) return;

          setTeammatesTaskSections(
            [
              {
                ...data.teammateTaskSection,
                teammateTasks: [],
              },
            ],
            {
              includeTeammateTask: false,
            },
          );

          const teammateTasks = get(
            teammateTasksByIdsState(data.teammateTaskIds),
          );

          const newTeammateTasks = teammateTasks.map((t: any) => ({
            ...t,
            teammateTaskSectionId: data.teammateTaskSection.id,
          }));
          setTeammateTask(newTeammateTasks as TeammateTaskResponse[], {
            includeTask: false,
          });
        } catch (_e) {
          // Handle error
        }
      },
      [
        setTeammateTask,
        setTeammatesTaskSections,
        undeleteTeammateTaskSectionAndKeepTasksMutation,
      ],
    ),
  );

  const undeleteTaskSectionAndDeleteTasks = useAtomCallback(
    useCallback(
      async (
        _get,
        _set,
        input: DeleteTeammateTaskSectionAndDeleteTasksMutation,
      ) => {
        const teammateTaskSection =
          input.deleteTeammateTaskSectionAndDeleteTasks.teammateTaskSection;
        const teammateTaskIds =
          input.deleteTeammateTaskSectionAndDeleteTasks.teammateTaskIds;
        const taskIds = input.deleteTeammateTaskSectionAndDeleteTasks.taskIds;

        const res = await undeleteTeammateTaskSectionAndDeleteTasksMutation({
          variables: {
            input: {
              name: teammateTaskSection.name,
              teammateId: teammateTaskSection.teammateId,
              workspaceId: teammateTaskSection.workspaceId,
              createdAt: teammateTaskSection.createdAt,
              updatedAt: teammateTaskSection.updatedAt,
              deletedTeammateTaskIds: teammateTaskIds,
              deletedTaskIds: taskIds,
              requestId:
                TEAMMATE_TASK_SECTION_UNDELETED_AND_DELETE_TASKS_SUBSCRIPTION_REQUEST_ID,
            },
          },
        });
        if (res.error) return;

        const data = res.data?.undeleteTeammateTaskSectionAndDeleteTasks;
        if (!data) return;

        setTeammatesTaskSections([data.teammateTaskSection], {
          includeTask: false,
        });
      },
      [
        setTeammatesTaskSections,
        undeleteTeammateTaskSectionAndDeleteTasksMutation,
      ],
    ),
  );

  return {
    addTeammatesTaskSection,
    deleteTaskSectionAndKeepTasks,
    deleteTaskSectionAndDeleteTasks,
    deleteTeammateTaskSection,
    undeleteTaskSectionAndKeepTasks,
    undeleteTaskSectionAndDeleteTasks,
  };
};

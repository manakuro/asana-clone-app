import { useMutation } from '@apollo/client/react';
import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import {
  CreateProjectTaskSectionDocument,
  DeleteProjectTaskSectionAndDeleteTasksDocument,
  DeleteProjectTaskSectionAndKeepTasksDocument,
  DeleteProjectTaskSectionDocument,
  UndeleteProjectTaskSectionAndDeleteTasksDocument,
  UndeleteProjectTaskSectionAndKeepTasksDocument,
} from '@/graphql/hooks';
import { uuid } from '@/shared/uuid';
import {
  type ProjectTaskResponse,
  projectTasksByIdsState,
  projectTasksByProjectTaskSectionIdState,
  useProjectTaskResponse,
  useResetProjectTask,
} from '@/store/entities/projectTask';
import { useWorkspace } from '@/store/entities/workspace';
import { initialState, projectTaskSectionState } from '../atom';
import type {
  DeleteProjectTaskSectionAndDeleteTasksMutation,
  DeleteProjectTaskSectionAndKeepTasksMutation,
} from '../type';
import { PROJECT_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskSectionCreatedSubscription';
import { PROJECT_TASK_SECTION_DELETED_AND_DELETED_TASKS_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskSectionDeletedAndDeleteTasksSubscription';
import { PROJECT_TASK_SECTION_DELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskSectionDeletedAndKeepTasksSubscription';
import { PROJECT_TASK_SECTION_DELETED_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskSectionDeletedSubscription';
import { useProjectTaskSectionResponse } from './useProjectTaskSectionResponse';
import { PROJECT_TASK_SECTION_UNDELETED_AND_DELETE_TASKS_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskSectionUndeletedAndDeleteTasksSubscription';
import { PROJECT_TASK_SECTION_UNDELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskSectionUndeletedAndKeepTasksSubscription';
import { useUpsert } from './useUpsert';

export const useProjectTaskSectionCommand = () => {
  const { upsert } = useUpsert();
  const [createProjectTaskSectionMutation] = useMutation(
    CreateProjectTaskSectionDocument,
  );
  const { workspace } = useWorkspace();
  const { setProjectTask } = useProjectTaskResponse();
  const { setProjectsTaskSections } = useProjectTaskSectionResponse();
  const { resetProjectTasks } = useResetProjectTask();

  const [deleteProjectTaskSectionAndKeepTasksMutation] = useMutation(
    DeleteProjectTaskSectionAndKeepTasksDocument,
  );

  const [deleteProjectTaskSectionAndDeleteTasksMutation] = useMutation(
    DeleteProjectTaskSectionAndDeleteTasksDocument,
  );

  const [deleteProjectTaskSectionMutation] = useMutation(
    DeleteProjectTaskSectionDocument,
  );

  const [undeleteProjectTaskSectionAndKeepTasksMutation] = useMutation(
    UndeleteProjectTaskSectionAndKeepTasksDocument,
  );

  const [undeleteProjectTaskSectionAndDeleteTasksMutation] = useMutation(
    UndeleteProjectTaskSectionAndDeleteTasksDocument,
  );

  const addProjectsTaskSection = useAtomCallback(
    useCallback(
      async (_, set, input: { projectId: string }) => {
        const id = uuid();
        upsert({
          ...initialState(),
          ...input,
          isNew: true,
          id,
        });

        const restore = () => {
          set(projectTaskSectionState(id), RESET);
        };

        try {
          const res = await createProjectTaskSectionMutation({
            variables: {
              input: {
                projectId: input.projectId,
                requestId: PROJECT_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID,
                workspaceId: workspace.id,
              },
            },
          });
          if (res.error) {
            restore();
            return '';
          }

          const addedProjectTaskSection = res.data?.createProjectTaskSection;
          if (!addedProjectTaskSection) return '';

          set(projectTaskSectionState(id), RESET);
          setProjectsTaskSections([
            {
              ...addedProjectTaskSection,
              isNew: true,
            },
          ]);

          return addedProjectTaskSection.id;
        } catch (e) {
          restore();
          throw e;
        }
      },
      [
        upsert,
        createProjectTaskSectionMutation,
        workspace.id,
        setProjectsTaskSections,
      ],
    ),
  );

  const deleteTaskSectionAndKeepTasks = useAtomCallback(
    useCallback(
      async (get, set, id: string) => {
        const projectTasks = get(projectTasksByProjectTaskSectionIdState(id));

        set(projectTaskSectionState(id), RESET);

        const restore = () => {
          const prev = get(projectTaskSectionState(id));
          setProjectsTaskSections([prev]);
        };

        try {
          const res = await deleteProjectTaskSectionAndKeepTasksMutation({
            variables: {
              input: {
                id,
                workspaceId: workspace.id,
                requestId:
                  PROJECT_TASK_SECTION_DELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.error) {
            restore();
            return null;
          }

          const projectTaskSection =
            res.data?.deleteProjectTaskSectionAndKeepTasks
              .keptProjectTaskSection;
          if (!projectTaskSection) return;

          const newProjectTasks = projectTasks.map((t) => ({
            ...t,
            projectTaskSectionId: projectTaskSection.id,
          }));
          setProjectTask(newProjectTasks as ProjectTaskResponse[], {
            includeTask: false,
          });

          return res.data;
        } catch (e) {
          restore();
          throw e;
        }
      },
      [
        deleteProjectTaskSectionAndKeepTasksMutation,
        setProjectTask,
        setProjectsTaskSections,
        workspace.id,
      ],
    ),
  );

  const deleteTaskSectionAndDeleteTasks = useAtomCallback(
    useCallback(
      async (get, set, id: string) => {
        const projectTasks = get(projectTasksByProjectTaskSectionIdState(id));

        set(projectTaskSectionState(id), RESET);
        resetProjectTasks(projectTasks.map((p) => p.id));

        const restore = () => {
          const prev = get(projectTaskSectionState(id));
          setProjectsTaskSections([prev]);
          setProjectTask(projectTasks as ProjectTaskResponse[]);
        };

        try {
          const res = await deleteProjectTaskSectionAndDeleteTasksMutation({
            variables: {
              input: {
                id,
                workspaceId: workspace.id,
                requestId:
                  PROJECT_TASK_SECTION_DELETED_AND_DELETED_TASKS_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.error) {
            restore();
            return null;
          }

          return res.data;
        } catch (e) {
          restore();
          throw e;
        }
      },
      [
        deleteProjectTaskSectionAndDeleteTasksMutation,
        resetProjectTasks,
        setProjectTask,
        setProjectsTaskSections,
        workspace.id,
      ],
    ),
  );

  const deleteProjectTaskSection = useAtomCallback(
    useCallback(
      async (get, set, id: string) => {
        set(projectTaskSectionState(id), RESET);

        const restore = () => {
          const prev = get(projectTaskSectionState(id));
          setProjectsTaskSections([prev]);
        };

        try {
          const res = await deleteProjectTaskSectionMutation({
            variables: {
              input: {
                id,
                workspaceId: workspace.id,
                requestId: PROJECT_TASK_SECTION_DELETED_SUBSCRIPTION_REQUEST_ID,
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
      [deleteProjectTaskSectionMutation, setProjectsTaskSections, workspace.id],
    ),
  );

  const undeleteTaskSectionAndKeepTasks = useAtomCallback(
    useCallback(
      async (
        get,
        _set,
        input: DeleteProjectTaskSectionAndKeepTasksMutation,
      ) => {
        const projectTaskSection =
          input.deleteProjectTaskSectionAndKeepTasks.projectTaskSection;
        const projectTaskIds =
          input.deleteProjectTaskSectionAndKeepTasks.projectTaskIds;

        try {
          const res = await undeleteProjectTaskSectionAndKeepTasksMutation({
            variables: {
              input: {
                name: projectTaskSection.name,
                projectId: projectTaskSection.projectId,
                workspaceId: workspace.id,
                createdAt: projectTaskSection.createdAt,
                updatedAt: projectTaskSection.updatedAt,
                keptProjectTaskIds: projectTaskIds,
                requestId:
                  PROJECT_TASK_SECTION_UNDELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.error) {
            return;
          }

          const data = res.data?.undeleteProjectTaskSectionAndKeepTasks;
          if (!data) return;

          setProjectsTaskSections([data.projectTaskSection], {
            includeProjectTasks: false,
          });

          const projectTasks = get(projectTasksByIdsState(data.projectTaskIds));

          const newProjectTasks = projectTasks.map((t) => ({
            ...t,
            projectTaskSectionId: data.projectTaskSection.id,
          }));
          setProjectTask(newProjectTasks as ProjectTaskResponse[], {
            includeTask: false,
          });
        } catch (_error) {
          // Handle error silently
        }
      },
      [
        setProjectTask,
        setProjectsTaskSections,
        undeleteProjectTaskSectionAndKeepTasksMutation,
        workspace.id,
      ],
    ),
  );

  const undeleteTaskSectionAndDeleteTasks = useAtomCallback(
    useCallback(
      async (
        _,
        _set,
        input: DeleteProjectTaskSectionAndDeleteTasksMutation,
      ) => {
        const projectTaskSection =
          input.deleteProjectTaskSectionAndDeleteTasks.projectTaskSection;
        const projectTaskIds =
          input.deleteProjectTaskSectionAndDeleteTasks.projectTaskIds;
        const taskIds = input.deleteProjectTaskSectionAndDeleteTasks.taskIds;

        const res = await undeleteProjectTaskSectionAndDeleteTasksMutation({
          variables: {
            input: {
              name: projectTaskSection.name,
              projectId: projectTaskSection.projectId,
              workspaceId: workspace.id,
              createdAt: projectTaskSection.createdAt,
              updatedAt: projectTaskSection.updatedAt,
              deletedProjectTaskIds: projectTaskIds,
              deletedTaskIds: taskIds,
              requestId:
                PROJECT_TASK_SECTION_UNDELETED_AND_DELETE_TASKS_SUBSCRIPTION_REQUEST_ID,
            },
          },
        });
        if (res.error) {
          return;
        }

        const data = res.data?.undeleteProjectTaskSectionAndDeleteTasks;
        if (!data) return;

        setProjectsTaskSections([data.projectTaskSection], {
          includeTask: false,
        });
      },
      [
        setProjectsTaskSections,
        undeleteProjectTaskSectionAndDeleteTasksMutation,
        workspace.id,
      ],
    ),
  );

  return {
    addProjectsTaskSection,
    deleteTaskSectionAndKeepTasks,
    deleteTaskSectionAndDeleteTasks,
    deleteProjectTaskSection,
    undeleteTaskSectionAndKeepTasks,
    undeleteTaskSectionAndDeleteTasks,
  };
};

import { useMutation } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { UpdateProjectDocument } from '@/graphql/hooks';
import type { UpdateProjectInput } from '@/graphql/types';
import {
  formatDueTimeToLocalTimezone,
  formatDueTimeToServerTimezone,
} from '@/shared/date';
import { omit } from '@/shared/utils/omit';
import { useWorkspace } from '@/store/entities/workspace';
import { projectState } from '../atom';
import type { Project } from '../type';
import { useSetHasDescriptionUpdated } from './useHasDescriptionUpdated';
import { PROJECT_UPDATED_SUBSCRIPTION_REQUEST_ID } from './useProjectUpdatedSubscription';
import { useUpsert } from './useUpsert';

export const useProjectCommand = () => {
  const [updateProjectMutation] = useMutation(UpdateProjectDocument);
  const { setHasDescriptionUpdated } = useSetHasDescriptionUpdated();
  const { workspace } = useWorkspace();
  const { upsert } = useUpsert();

  const setProject = useAtomCallback(
    useCallback(
      async (
        get,
        _,
        input: { projectId: string } & Partial<Omit<Project, 'id'>>,
      ) => {
        const prev = get(projectState(input.projectId));

        upsert({ ...prev, ...omit(input, 'projectId') });

        const restore = () => {
          upsert(prev);
        };

        try {
          const res = await updateProjectMutation({
            variables: {
              input: prepareUpdateProjectInput({
                ...input,
                workspaceId: workspace.id,
              }),
            },
          });
          if (res.error) {
            restore();
          }
        } catch (err) {
          restore();
          throw err;
        }
      },
      [updateProjectMutation, upsert, workspace.id],
    ),
  );

  const setProjectDescription = useAtomCallback(
    useCallback(
      async (
        _get,
        _set,
        input: {
          projectId: string;
          description: Project['description'];
        },
        options?: { hasDescriptionUpdated: boolean },
      ) => {
        const hasDescriptionUpdated = options?.hasDescriptionUpdated ?? false;

        await setProject({
          projectId: input.projectId,
          description: input.description,
        });
        if (hasDescriptionUpdated) {
          await setHasDescriptionUpdated(input.projectId);
        }
      },
      [setHasDescriptionUpdated, setProject],
    ),
  );

  const setProjectDueDate = useAtomCallback(
    useCallback(
      async (_get, _set, input: { projectId: string; dueDate: Date }) => {
        await setProject({
          projectId: input.projectId,
          dueDate: formatDueTimeToLocalTimezone(input.dueDate),
        });
      },
      [setProject],
    ),
  );

  const resetProjectDueDate = useAtomCallback(
    useCallback(
      async (_get, _set, input: { projectId: string }) => {
        await setProject({
          projectId: input.projectId,
          dueDate: '',
        });
      },
      [setProject],
    ),
  );

  return {
    setProject,
    setProjectDueDate,
    resetProjectDueDate,
    setProjectDescription,
  };
};

const prepareUpdateProjectInput = (
  input: { projectId: string; workspaceId: string } & Partial<
    Omit<Project, 'id'>
  >,
): UpdateProjectInput => {
  let res: UpdateProjectInput = {
    id: input.projectId,
    requestId: PROJECT_UPDATED_SUBSCRIPTION_REQUEST_ID,
    ...omit(input, 'projectId'),
  };
  if (input.dueDate === '') {
    res = omit(res, 'dueDate');
    res.clearDueDate = true;
  }
  if (input.dueDate) {
    res.dueDate = formatDueTimeToServerTimezone(new Date(input.dueDate));
  }

  return res;
};

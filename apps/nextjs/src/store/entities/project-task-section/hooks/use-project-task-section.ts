import { useMutation } from '@apollo/client/react';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useMemo } from 'react';
import { UpdateProjectTaskSectionDocument } from '@/graphql/documents';
import type { UpdateTeammateTaskSectionInput } from '@/graphql/types';
import { useWorkspace } from '@/store/entities/workspace';
import { omit } from '@/utils/omit';
import { projectTaskSectionState } from '../atom';
import type { ProjectTaskSection } from '../type';
import {
  DEFAULT_TITLE_NAME,
  hasProjectTaskSectionBeenPersisted,
} from '../util';
import { PROJECT_TASK_SECTION_UPDATED_SUBSCRIPTION_REQUEST_ID } from './use-project-task-section-updated-subscription';
import { useUpsert } from './use-upsert';

export const useProjectTaskSection = (projectTaskSectionId: string) => {
  const { upsert } = useUpsert();
  const { workspace } = useWorkspace();
  const projectTaskSection = useAtomValue(
    useMemo(
      () => projectTaskSectionState(projectTaskSectionId),
      [projectTaskSectionId],
    ),
  );

  const [updateProjectTaskSectionMutation] = useMutation(
    UpdateProjectTaskSectionDocument,
  );

  const setProjectTaskSection = useAtomCallback(
    useCallback(
      async (get, _set, input: Partial<ProjectTaskSection>) => {
        const prev = get(projectTaskSectionState(projectTaskSectionId));
        if (!hasProjectTaskSectionBeenPersisted(prev)) return;

        upsert({ ...prev, ...input });

        const res = await updateProjectTaskSectionMutation({
          variables: {
            input: prepareUpdateTeammateTaskSectionInput(
              projectTaskSectionId,
              workspace.id,
              input,
            ),
          },
        });
        if (res.error) {
          upsert(prev);
        }
      },
      [
        projectTaskSectionId,
        updateProjectTaskSectionMutation,
        upsert,
        workspace.id,
      ],
    ),
  );

  const setProjectTaskSectionName = useAtomCallback(
    useCallback(
      async (_, _set, input: string) => {
        if (
          projectTaskSection.name &&
          input &&
          projectTaskSection.name === input
        )
          return;
        const name = input || DEFAULT_TITLE_NAME;

        await setProjectTaskSection({ name, isNew: false });
      },
      [setProjectTaskSection, projectTaskSection.name],
    ),
  );

  return {
    projectTaskSection,
    setProjectTaskSectionName,
  };
};

const prepareUpdateTeammateTaskSectionInput = (
  teammateTaskSectionId: string,
  workspaceId: string,
  input: Partial<ProjectTaskSection>,
): UpdateTeammateTaskSectionInput & { workspaceId: string } => {
  return {
    ...omit(input, 'isNew'),
    id: teammateTaskSectionId,
    workspaceId,
    requestId: PROJECT_TASK_SECTION_UPDATED_SUBSCRIPTION_REQUEST_ID,
  };
};

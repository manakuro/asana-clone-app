import { useMutation } from '@apollo/client/react';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useMemo } from 'react';
import { UpdateTeammateTaskSectionDocument } from '@/graphql/hooks';
import { omit } from '@/shared/utils/omit';
import { useWorkspace } from '@/store/entities/workspace';
import { teammatesTaskSectionState } from '../atom';
import type {
  TeammateTaskSection,
  UpdateTeammateTaskSectionInput,
} from '../type';
import {
  DEFAULT_TITLE_NAME,
  hasTeammateTaskSectionBeenPersisted,
} from '../util';
import { TEAMMATE_TASK_SECTION_UPDATED_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskSectionUpdatedSubscription';

export const useTeammateTaskSection = (teammateTaskSectionId: string) => {
  const { workspace } = useWorkspace();

  const teammateTaskSection = useAtomValue(
    useMemo(
      () => teammatesTaskSectionState(teammateTaskSectionId),
      [teammateTaskSectionId],
    ),
  );
  const [updateTeammateTaskSectionMutation] = useMutation(
    UpdateTeammateTaskSectionDocument,
  );

  const setTeammateTaskSection = useAtomCallback(
    useCallback(
      async (get, set, input: Partial<TeammateTaskSection>) => {
        const prev = get(teammatesTaskSectionState(teammateTaskSectionId));
        if (!hasTeammateTaskSectionBeenPersisted(prev)) return;

        const updated = { ...prev, ...input };
        set(teammatesTaskSectionState(teammateTaskSectionId), updated);

        const res = await updateTeammateTaskSectionMutation({
          variables: {
            input: prepareUpdateTeammateTaskSectionInput(
              teammateTaskSectionId,
              workspace.id,
              input,
            ),
          },
        });
        if (res.error) {
          set(teammatesTaskSectionState(teammateTaskSectionId), prev);
        }
      },
      [teammateTaskSectionId, updateTeammateTaskSectionMutation, workspace.id],
    ),
  );

  const setTeammateTaskSectionName = useAtomCallback(
    useCallback(
      async (_get, _set, input: string) => {
        if (
          teammateTaskSection.name &&
          input &&
          teammateTaskSection.name === input
        )
          return;
        const name = input || DEFAULT_TITLE_NAME;

        await setTeammateTaskSection({ name, isNew: false });
      },
      [setTeammateTaskSection, teammateTaskSection.name],
    ),
  );

  return {
    teammateTaskSection,
    setTeammateTaskSectionName,
  };
};

export const prepareUpdateTeammateTaskSectionInput = (
  teammateTaskSectionId: string,
  workspaceId: string,
  input: Partial<TeammateTaskSection>,
): UpdateTeammateTaskSectionInput => {
  return {
    ...omit(input, 'isNew'),
    id: teammateTaskSectionId,
    workspaceId,
    requestId: TEAMMATE_TASK_SECTION_UPDATED_SUBSCRIPTION_REQUEST_ID,
  };
};

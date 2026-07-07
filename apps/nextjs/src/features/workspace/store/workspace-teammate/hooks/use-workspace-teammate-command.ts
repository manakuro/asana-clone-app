import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import {
  ownerWorkspaceTeammateByWorkspaceIdState,
  workspaceTeammateByWorkspaceIdAndTeammateIdState,
  workspaceTeammateState,
} from '../atom';
import type { WorkspaceTeammate } from '../type';
import { useUpsert } from './use-upsert';

export const useWorkspaceTeammateCommand = () => {
  const { upsert } = useUpsert();

  const setWorkspaceTeammateById = useAtomCallback(
    useCallback(
      async (
        get,
        _set,
        workspaceTeammateId: string,
        input: Partial<WorkspaceTeammate>,
      ) => {
        const current = get(workspaceTeammateState(workspaceTeammateId));
        upsert({
          ...current,
          ...input,
        });
      },
      [upsert],
    ),
  );

  const setWorkspaceTeammateByWorkspaceIdAndTeammateId = useAtomCallback(
    useCallback(
      async (
        get,
        _set,
        workspaceId: string,
        teammateId: string,
        input: Partial<WorkspaceTeammate>,
      ) => {
        const current = get(
          workspaceTeammateByWorkspaceIdAndTeammateIdState({
            workspaceId,
            teammateId,
          }),
        );
        upsert({
          ...current,
          ...input,
        });
      },
      [upsert],
    ),
  );

  const setOwnerByWorkspaceIdAndTeammateId = useAtomCallback(
    useCallback(
      async (get, _set, workspaceId: string, teammateId: string) => {
        const currentOwner = get(
          ownerWorkspaceTeammateByWorkspaceIdState(workspaceId),
        );
        upsert({
          ...currentOwner,
          isOwner: false,
        });

        const nextOwner = get(
          workspaceTeammateByWorkspaceIdAndTeammateIdState({
            workspaceId,
            teammateId,
          }),
        );
        upsert({
          ...nextOwner,
          isOwner: true,
        });
      },
      [upsert],
    ),
  );

  return {
    setWorkspaceTeammateById,
    setWorkspaceTeammateByWorkspaceIdAndTeammateId,
    setOwnerByWorkspaceIdAndTeammateId,
  };
};

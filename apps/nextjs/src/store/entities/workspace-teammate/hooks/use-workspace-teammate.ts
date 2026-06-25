import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { workspaceTeammateState } from '../atom';

export const useWorkspaceTeammate = (workspaceTeammateId: string) => {
  const workspaceTeammate = useAtomValue(
    useMemo(
      () => workspaceTeammateState(workspaceTeammateId),
      [workspaceTeammateId],
    ),
  );
  const role = useMemo(() => {
    if (workspaceTeammate.role) return workspaceTeammate.role;
    if (workspaceTeammate.isOwner) return 'Project Owner';
    return '';
  }, [workspaceTeammate.isOwner, workspaceTeammate.role]);

  return {
    workspaceTeammate,
    role,
  };
};

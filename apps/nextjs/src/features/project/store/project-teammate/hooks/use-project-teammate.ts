import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { projectTeammateState } from '../atom';

export const useProjectTeammate = (projectTeammateId: string) => {
  const projectTeammate = useAtomValue(
    useMemo(() => projectTeammateState(projectTeammateId), [projectTeammateId]),
  );
  const role = useMemo(() => {
    if (projectTeammate.role) return projectTeammate.role;
    if (projectTeammate.isOwner) return 'Project Owner';
    return '';
  }, [projectTeammate.isOwner, projectTeammate.role]);

  return {
    projectTeammate,
    role,
  };
};

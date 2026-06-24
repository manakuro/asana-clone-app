import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { useProjectResponse } from '@/store/entities/project';
import { useTeammateResponse } from '@/store/entities/teammate';
import { useWorkspaceResponse as useWorkspaceResponseEntity } from '@/store/entities/workspace';
import { useWorkspaceTeammateResponse } from '@/store/entities/workspaceTeammate';
import type { WorkspaceResponse } from '../type';

export const useWorkspaceResponse = () => {
  const workspaceResponseEntity = useWorkspaceResponseEntity();
  const { setProjects } = useProjectResponse();
  const { setWorkspaceTeammates } = useSetters();

  const setWorkspace = useAtomCallback(
    useCallback(
      (_get, _set, data: WorkspaceResponse) => {
        workspaceResponseEntity.setWorkspace(data.workspace);
        setProjects(data.workspace?.projects || []);
        setWorkspaceTeammates(data);
      },
      [workspaceResponseEntity, setProjects, setWorkspaceTeammates],
    ),
  );

  return {
    setWorkspace,
  };
};

const useSetters = () => {
  const teammatesResponse = useTeammateResponse();
  const workspaceTeammatesResponse = useWorkspaceTeammateResponse();

  const setWorkspaceTeammates = useAtomCallback(
    useCallback(
      (_get, _set, data: WorkspaceResponse) => {
        workspaceTeammatesResponse.setWorkspaceTeammates(
          data.workspace?.workspaceTeammates || [],
        );

        const teammates =
          data.workspace?.workspaceTeammates.map((w) => w.teammate) || [];
        teammatesResponse.setTeammates(teammates);
      },
      [teammatesResponse, workspaceTeammatesResponse],
    ),
  );

  return {
    setWorkspaceTeammates,
  };
};

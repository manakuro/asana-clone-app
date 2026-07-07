import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { useProjectResponse } from '@/features/project/store/project';
import { useTeammateResponse } from '@/features/teammate/store/teammate';
import { useWorkspaceResponse as useWorkspaceResponseEntity } from '@/features/workspace/store/workspace';
import { useWorkspaceTeammateResponse } from '@/features/workspace/store/workspace-teammate';
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

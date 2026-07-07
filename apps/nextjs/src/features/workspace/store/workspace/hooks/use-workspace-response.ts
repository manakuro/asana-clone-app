import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { workspaceState } from '../atom';
import type { WorkspaceResponse } from '../type';

export const useWorkspaceResponse = () => {
  const setWorkspace = useAtomCallback(
    useCallback((_get, set, data: WorkspaceResponse) => {
      set(workspaceState, (prev) => {
        return {
          ...prev,
          ...data,
          description: {
            ...prev.description,
            ...data?.description,
          },
        };
      });
    }, []),
  );

  return {
    setWorkspace,
  };
};

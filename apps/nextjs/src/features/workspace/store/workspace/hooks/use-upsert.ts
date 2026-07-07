import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { workspaceState } from '../atom';
import type { Workspace } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((_get, set, workspace: Workspace) => {
      set(workspaceState, workspace);
    }, []),
  );

  return {
    upsert,
  };
};

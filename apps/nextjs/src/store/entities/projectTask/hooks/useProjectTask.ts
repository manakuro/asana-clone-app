import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useMemo } from 'react';
import { projectTaskState } from '../atom';

export const useProjectTask = (projectTaskId: string) => {
  const projectTask = useAtomValue(
    useMemo(() => projectTaskState(projectTaskId), [projectTaskId]),
  );

  return {
    projectTask,
  };
};

export const useGetProjectTask = () => {
  const getProjectTask = useAtomCallback(
    useCallback((get, _, projectTaskId: string) => {
      return get(projectTaskState(projectTaskId));
    }, []),
  );

  return {
    getProjectTask,
  };
};

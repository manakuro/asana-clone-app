import { useAtomValue } from 'jotai';
import { projectIdsState } from '../atom';

export const useProjectIds = () => {
  const projectIds = useAtomValue(projectIdsState);

  return {
    projectIds,
  };
};

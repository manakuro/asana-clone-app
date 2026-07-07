import { useAtomValue } from 'jotai';
import { projectIconIdsState } from '../atom';

export const useProjectIconIds = () => {
  const projectIconIds = useAtomValue(projectIconIdsState);

  return {
    projectIconIds,
  };
};

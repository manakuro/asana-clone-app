import { useAtomValue } from 'jotai';
import { projectBaseColorIdsState } from '../atom';

export const useProjectBaseColorIds = () => {
  const projectBaseColorIds = useAtomValue(projectBaseColorIdsState);

  return {
    projectBaseColorIds,
  };
};

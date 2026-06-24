import { useAtomValue } from 'jotai';
import { projectLightColorIdsState } from '../atom';

export const useProjectLightColorIds = () => {
  const projectLightColorIds = useAtomValue(projectLightColorIdsState);

  return {
    projectLightColorIds,
  };
};

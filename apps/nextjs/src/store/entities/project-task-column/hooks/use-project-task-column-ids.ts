import { useAtomValue } from 'jotai';
import { projectTaskColumnIdsState } from '../atom';

export const useProjectTaskColumnIds = () => {
  const ids = useAtomValue(projectTaskColumnIdsState);

  return {
    projectsTaskColumnIds: ids,
  };
};

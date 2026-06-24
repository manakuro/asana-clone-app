import { useAtomValue } from 'jotai';
import { taskFileIdsState, taskFilesState } from '../atom';

export const useTaskFiles = () => {
  const taskFileIds = useAtomValue(taskFileIdsState);
  const taskFiles = useAtomValue(taskFilesState);

  return {
    taskFileIds,
    taskFiles,
  };
};

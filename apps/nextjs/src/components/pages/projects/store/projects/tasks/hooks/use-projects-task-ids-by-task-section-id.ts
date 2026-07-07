import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useProjectsProjectId } from '../../project';
import { taskIdsByTaskSectionIdState } from '../atom';

export const useProjectsTaskIdsByTaskSectionId = (taskSectionId: string) => {
  const { projectId } = useProjectsProjectId();
  const ids = useAtomValue(
    useMemo(
      () => taskIdsByTaskSectionIdState({ taskSectionId, projectId }),
      [taskSectionId, projectId],
    ),
  );
  const taskIds = useMemo(() => ids, [ids]);

  return {
    taskIds,
  };
};

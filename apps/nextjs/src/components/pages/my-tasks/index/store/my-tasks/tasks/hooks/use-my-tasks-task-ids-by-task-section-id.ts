import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskIdsByTaskSectionIdState } from '../atom';

export const useMyTasksTaskIdsByTaskSectionId = (
  teammateTaskSectionId: string,
) => {
  const ids = useAtomValue(
    useMemo(
      () => taskIdsByTaskSectionIdState({ teammateTaskSectionId }),
      [teammateTaskSectionId],
    ),
  );
  const taskIds = useMemo(() => ids, [ids]);

  return {
    taskIds,
  };
};

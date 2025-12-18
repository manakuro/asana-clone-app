import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import type { TaskColumnTypeValue } from '@/store/entities/taskColumn';
import { projectsTaskColumnByTypeState } from '../atom';

export const useProjectTaskColumnByType = ({
  type,
  projectId,
}: {
  type: TaskColumnTypeValue;
  projectId: string;
}) => {
  const projectsTaskColumn = useAtomValue(
    useMemo(
      () => projectsTaskColumnByTypeState({ projectId, type }),
      [projectId, type],
    ),
  );

  return {
    projectsTaskColumn,
  };
};

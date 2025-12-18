import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { useTaskColumnsResponse } from '@/store/entities/taskColumn';
import { projectTaskColumnState } from '../atom';
import type { ProjectTaskColumnResponse } from '../type';

export const useProjectTaskColumnResponse = () => {
  const { setTaskColumns } = useTaskColumnsResponse();

  const setProjectsTaskColumns = useAtomCallback(
    useCallback(
      (_, set, data: ProjectTaskColumnResponse[]) => {
        data.forEach((p) => {
          set(projectTaskColumnState(p.id), p);
        });
        const taskColumns = data.map((d) => d.taskColumn);
        setTaskColumns(taskColumns);
      },
      [setTaskColumns],
    ),
  );

  return {
    setProjectsTaskColumns,
  };
};

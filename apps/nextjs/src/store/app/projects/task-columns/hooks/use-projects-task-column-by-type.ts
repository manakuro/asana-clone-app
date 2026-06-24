import { useProjectsProjectId } from '@/store/app/projects/project';
import * as projectsTaskColumns from '@/store/entities/projectTaskColumn';
import type { TaskColumnTypeValue } from '@/store/entities/taskColumn';

export const useProjectsTaskColumnByType = (type: TaskColumnTypeValue) => {
  const { projectId } = useProjectsProjectId();
  const { projectsTaskColumn } = projectsTaskColumns.useProjectTaskColumnByType(
    {
      type,
      projectId,
    },
  );

  return {
    tasksTaskColumn: projectsTaskColumn,
  };
};

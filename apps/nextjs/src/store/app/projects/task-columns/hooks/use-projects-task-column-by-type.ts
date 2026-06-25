import { useProjectsProjectId } from '@/store/app/projects/project';
import * as projectsTaskColumns from '@/store/entities/project-task-column';
import type { TaskColumnTypeValue } from '@/store/entities/task-column';

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

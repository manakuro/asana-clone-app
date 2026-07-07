import { useProjectsProjectId } from '@/components/pages/projects/store/projects/project';
import * as projectsTaskColumns from '@/features/project/store/project-task-column';
import type { TaskColumnTypeValue } from '@/features/task/store/task-column';

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

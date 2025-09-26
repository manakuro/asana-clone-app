import { useMyTasksTaskSections } from '@/store/app/myTasks/taskSections';
import { useProjectsTaskSections } from '@/store/app/projects/taskSections';
import type { ProjectTaskSection } from '@/store/entities/projectTaskSection';
import type { TeammateTaskSection } from '@/store/entities/teammatesTaskSection';
import { useTasksContext } from '../TasksProvider';

export type TaskSection = TeammateTaskSection | ProjectTaskSection;

type Result = {
  taskSections: TaskSection[];
};

export const useTasksTaskSections = (): Result => {
  const { isMyTasksPage } = useTasksContext();

  const myTasks = useMyTasksTaskSections();
  const projects = useProjectsTaskSections();

  if (isMyTasksPage) {
    return {
      taskSections: myTasks.taskSections,
    };
  }

  return {
    taskSections: projects.taskSections,
  };
};

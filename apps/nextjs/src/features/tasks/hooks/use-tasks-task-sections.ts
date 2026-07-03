import { useMyTasksTaskSections } from '@/store/app/my-tasks/task-sections';
import { useProjectsTaskSections } from '@/store/app/projects/task-sections';
import type { ProjectTaskSection } from '@/store/entities/project-task-section';
import type { TeammateTaskSection } from '@/store/entities/teammates-task-section';
import { useTasksContext } from '../components/tasks-provider';

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

import { useMyTasksTaskSections } from '@/components/pages/my-tasks/index/store/my-tasks/task-sections';
import { useProjectsTaskSections } from '@/components/pages/projects/store/projects/task-sections';
import type { ProjectTaskSection } from '@/features/project/store/project-task-section';
import type { TeammateTaskSection } from '@/features/teammate/store/teammates-task-section';
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

import { useMyTasksTaskSection } from '@/store/app/my-tasks/task-sections';
import { useProjectsTaskSection } from '@/store/app/projects/task-sections';
import { useTasksContext } from '../tasks-provider';

type Result = {
  taskSection: {
    id: string;
    name: string;
    isNew?: boolean;
    assigned?: boolean;
  };
  setSectionName: (val: string) => Promise<void>;
};

export const useTasksTaskSection = (taskSectionId: string): Result => {
  const { isMyTasksPage } = useTasksContext();
  const myTasks = useMyTasksTaskSection(taskSectionId);
  const projects = useProjectsTaskSection(taskSectionId);

  if (isMyTasksPage) {
    return {
      taskSection: myTasks.taskSection,
      setSectionName: myTasks.setSectionName,
    };
  }

  return {
    taskSection: projects.taskSection,
    setSectionName: projects.setSectionName,
  };
};

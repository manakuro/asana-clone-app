import { useMyTasksTaskSection } from '@/components/pages/my-tasks/index/store/my-tasks/task-sections';
import { useProjectsTaskSection } from '@/components/pages/projects/store/projects/task-sections';
import { useTasksContext } from '../components/tasks-provider';

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

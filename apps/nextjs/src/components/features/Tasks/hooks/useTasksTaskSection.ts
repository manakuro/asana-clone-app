import { useMyTasksTaskSection } from '@/store/app/myTasks/taskSections';
import { useProjectsTaskSection } from '@/store/app/projects/taskSections';
import { useTasksContext } from '../TasksProvider';

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

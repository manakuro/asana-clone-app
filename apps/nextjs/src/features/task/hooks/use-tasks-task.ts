import { useMyTasksTask } from '@/components/pages/my-tasks/index/store/my-tasks/tasks';
import { useProjectsTask } from '@/components/pages/projects/store/projects/tasks';
import { useTasksContext } from '../components/tasks-provider';

type Result = {
  addTask: (val: { taskSectionId: string }) => Promise<string>;
  setTaskSectionId: (val: { taskSectionId: string; taskId: string }) => void;
};

export const useTasksTask = (): Result => {
  const { isMyTasksPage } = useTasksContext();
  const myTasks = useMyTasksTask();
  const projects = useProjectsTask();

  if (isMyTasksPage) {
    return {
      addTask: myTasks.addTask,
      setTaskSectionId: myTasks.setTaskSectionId,
    };
  }

  return {
    addTask: projects.addTask,
    setTaskSectionId: projects.setTaskSectionId,
  };
};

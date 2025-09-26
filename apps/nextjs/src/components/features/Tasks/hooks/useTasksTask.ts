import { useMyTasksTask } from '@/store/app/myTasks/tasks';
import { useProjectsTask } from '@/store/app/projects/tasks';
import { useTasksContext } from '../TasksProvider';

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

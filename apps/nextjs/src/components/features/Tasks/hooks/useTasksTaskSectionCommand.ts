import { useMyTasksTaskSectionCommand } from '@/store/app/myTasks/taskSections';
import { useProjectsTaskSectionCommand } from '@/store/app/projects/taskSections';
import type {
  DeleteProjectTaskSectionAndDeleteTasksMutation,
  DeleteProjectTaskSectionAndKeepTasksMutation,
} from '@/store/entities/projectTaskSection';
import type {
  DeleteTeammateTaskSectionAndDeleteTasksMutation,
  DeleteTeammateTaskSectionAndKeepTasksMutation,
} from '@/store/entities/teammatesTaskSection';
import { useTasksContext } from '../TasksProvider';

export type DeleteTaskSectionAndKeepTasksResponse =
  | DeleteTeammateTaskSectionAndKeepTasksMutation
  | DeleteProjectTaskSectionAndKeepTasksMutation;

export type DeleteTaskSectionAndDeleteTasksResponse =
  | DeleteTeammateTaskSectionAndDeleteTasksMutation
  | DeleteProjectTaskSectionAndDeleteTasksMutation;

type Result = {
  addTaskSection: () => Promise<string>;
  deleteTaskSectionAndKeepTasks: (
    id: string,
  ) => Promise<DeleteTaskSectionAndKeepTasksResponse | null | undefined>;
  deleteTaskSectionAndDeleteTasks: (
    id: string,
  ) => Promise<DeleteTaskSectionAndDeleteTasksResponse | null | undefined>;
  deleteTaskSection: (id: string) => Promise<void>;
  undeleteTaskSectionAndKeepTasks: (
    val: DeleteTaskSectionAndKeepTasksResponse,
  ) => Promise<void>;
  undeleteTaskSectionAndDeleteTasks: (
    val: DeleteTaskSectionAndDeleteTasksResponse,
  ) => Promise<void>;
};

export const useTasksTaskSectionCommand = (): Result => {
  const { isMyTasksPage } = useTasksContext();

  const myTasks = useMyTasksTaskSectionCommand();
  const projects = useProjectsTaskSectionCommand();

  if (isMyTasksPage) {
    return {
      addTaskSection: myTasks.addTaskSection,
      deleteTaskSectionAndKeepTasks: myTasks.deleteTaskSectionAndKeepTasks,
      deleteTaskSectionAndDeleteTasks: myTasks.deleteTaskSectionAndDeleteTasks,
      deleteTaskSection: myTasks.deleteTeammateTaskSection,
      undeleteTaskSectionAndKeepTasks:
        myTasks.undeleteTaskSectionAndKeepTasks as Result['undeleteTaskSectionAndKeepTasks'],
      undeleteTaskSectionAndDeleteTasks:
        myTasks.undeleteTaskSectionAndDeleteTasks as Result['undeleteTaskSectionAndDeleteTasks'],
    };
  }

  return {
    addTaskSection: projects.addTaskSection,
    deleteTaskSectionAndKeepTasks: projects.deleteTaskSectionAndKeepTasks,
    deleteTaskSectionAndDeleteTasks: projects.deleteTaskSectionAndDeleteTasks,
    deleteTaskSection: projects.deleteProjectTaskSection,
    undeleteTaskSectionAndKeepTasks:
      projects.undeleteTaskSectionAndKeepTasks as Result['undeleteTaskSectionAndKeepTasks'],
    undeleteTaskSectionAndDeleteTasks:
      projects.undeleteTaskSectionAndDeleteTasks as Result['undeleteTaskSectionAndDeleteTasks'],
  };
};

import { useMyTasksTaskListStatus } from '@/store/app/myTasks/taskListStatus';
import { useProjectsTaskListStatus } from '@/store/app/projects/taskListStatus';
import {
  TaskListCompletedStatusCode,
  type TaskListCompletedStatusCodeValue,
} from '@/store/entities/taskListCompletedStatus';
import {
  TaskListSortStatusCode,
  type TaskListSortStatusCodeValue,
} from '@/store/entities/taskListSortStatus';
import { useTasksContext } from '../TasksProvider';

type Result = {
  taskListStatus: {
    taskListCompletedStatus: TaskListCompletedStatusCodeValue;
    taskListSortStatus: TaskListSortStatusCodeValue;
  };
  sortByNone: () => void;
  sortByAlphabetical: () => void;
  sortByLikes: () => void;
  sortByDueDate: () => void;
  sortByProject?: () => void;
  sortByAssignee?: () => void;
  sortByPriority?: () => void;
  setTaskListCompletedStatus: (
    status: TaskListCompletedStatusCodeValue,
  ) => void;
};

export const useTasksTaskListStatus = (): Result => {
  const { isMyTasksPage } = useTasksContext();
  const myTasks = useMyTasksTaskListStatus();
  const projects = useProjectsTaskListStatus();

  if (isMyTasksPage) {
    return {
      taskListStatus: {
        taskListCompletedStatus: getTaskListCompletedStatus(myTasks),
        taskListSortStatus: getTaskListSortStatus(myTasks),
      },
      sortByNone: myTasks.sortByNone,
      sortByAlphabetical: myTasks.sortByAlphabetical,
      sortByLikes: myTasks.sortByLikes,
      sortByDueDate: myTasks.sortByDueDate,
      sortByProject: myTasks.sortByProject,
      setTaskListCompletedStatus: myTasks.setTaskListCompletedStatus,
    };
  }

  return {
    taskListStatus: {
      taskListCompletedStatus: getTaskListCompletedStatus(projects),
      taskListSortStatus: getTaskListSortStatus(projects),
    },
    sortByNone: projects.sortByNone,
    sortByAlphabetical: projects.sortByAlphabetical,
    sortByLikes: projects.sortByLikes,
    sortByDueDate: projects.sortByDueDate,
    sortByAssignee: projects.sortByAssignee,
    sortByPriority: projects.sortByPriority,
    setTaskListCompletedStatus: projects.setTaskListCompletedStatus,
  };
};

const getTaskListCompletedStatus = <
  T extends {
    taskListStatus: {
      taskListCompletedStatus: {
        statusCode: TaskListCompletedStatusCodeValue | null;
      };
    };
  },
>(
  data: T,
) => {
  return (
    data.taskListStatus.taskListCompletedStatus.statusCode ||
    TaskListCompletedStatusCode.Incomplete
  );
};

const getTaskListSortStatus = <
  T extends {
    taskListStatus: {
      taskListSortStatus: {
        statusCode: TaskListSortStatusCodeValue | null;
      };
    };
  },
>(
  data: T,
) => {
  return (
    data.taskListStatus.taskListSortStatus.statusCode ||
    TaskListSortStatusCode.None
  );
};

import { useRouter as useRouterNext } from 'next/navigation';
import { useCallback } from 'react';
import type { Options } from '../types';
import {
  ROUTE_MY_TASKS,
  ROUTE_MY_TASKS_BOARD,
  ROUTE_MY_TASKS_CALENDAR,
  ROUTE_MY_TASKS_FILES,
  ROUTE_MY_TASKS_LIST,
} from './routes';

export const useRouterMyTasks = () => {
  const router = useRouterNext();
  const { push } = router;

  const navigateToMyTasksList = useCallback(
    (options?: Options) => {
      push(ROUTE_MY_TASKS_LIST.href.pathname(), options);
    },
    [push],
  );

  const navigateToMyTasksTaskDetail = useCallback(
    (id: string, options?: Options) => {
      push(`${ROUTE_MY_TASKS.href.pathname()}/${id}`, options);
    },
    [push],
  );

  const navigateToMyTasksTaskDetailFeed = useCallback(
    (taskId: string, taskFeedId: string, options?: Options) => {
      push(
        `${ROUTE_MY_TASKS.href.pathname()}/${taskId}/${taskFeedId}`,
        options,
      );
    },
    [push],
  );

  const navigateToMyTasksBoard = useCallback(
    (options?: Options) => {
      push(ROUTE_MY_TASKS_BOARD.href.pathname(), options);
    },
    [push],
  );
  const navigateToMyTasksCalendar = useCallback(
    (options?: Options) => {
      push(ROUTE_MY_TASKS_CALENDAR.href.pathname(), options);
    },
    [push],
  );
  const navigateToMyTasksFiles = useCallback(
    (options?: Options) => {
      push(ROUTE_MY_TASKS_FILES.href.pathname(), options);
    },
    [push],
  );

  return {
    navigateToMyTasksList,
    navigateToMyTasksBoard,
    navigateToMyTasksCalendar,
    navigateToMyTasksFiles,
    navigateToMyTasksTaskDetail,
    navigateToMyTasksTaskDetailFeed,
  };
};

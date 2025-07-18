import { useRouter as useRouterNext } from 'next/router';
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
    async (options?: Options) => {
      await push(ROUTE_MY_TASKS_LIST.href.pathname(), undefined, {
        shallow: true,
        ...options,
      });
    },
    [push],
  );

  const navigateToMyTasksTaskDetail = useCallback(
    async (id: string, options?: Options) => {
      await push(`${ROUTE_MY_TASKS.href.pathname()}/${id}`, undefined, {
        shallow: true,
        ...options,
      });
    },
    [push],
  );

  const navigateToMyTasksTaskDetailFeed = useCallback(
    async (taskId: string, taskFeedId: string, options?: Options) => {
      await push(
        `${ROUTE_MY_TASKS.href.pathname()}/${taskId}/${taskFeedId}`,
        undefined,
        {
          shallow: true,
          ...options,
        },
      );
    },
    [push],
  );

  const navigateToMyTasksBoard = useCallback(
    async (options?: Options) => {
      await push(ROUTE_MY_TASKS_BOARD.href.pathname(), undefined, {
        shallow: true,
        ...options,
      });
    },
    [push],
  );
  const navigateToMyTasksCalendar = useCallback(
    async (options?: Options) => {
      await push(ROUTE_MY_TASKS_CALENDAR.href.pathname(), undefined, {
        shallow: true,
        ...options,
      });
    },
    [push],
  );
  const navigateToMyTasksFiles = useCallback(
    async (options?: Options) => {
      await push(ROUTE_MY_TASKS_FILES.href.pathname(), undefined, {
        shallow: true,
        ...options,
      });
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

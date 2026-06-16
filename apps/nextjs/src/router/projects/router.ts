import { useRouter as useRouterNext } from 'next/navigation';
import { useCallback } from 'react';
import type { Options } from '../types';
import {
  ROUTE_PROJECTS,
  ROUTE_PROJECTS_BOARD,
  ROUTE_PROJECTS_CALENDAR,
  ROUTE_PROJECTS_FILES,
  ROUTE_PROJECTS_LIST,
  ROUTE_PROJECTS_OVERVIEW,
} from './routes';

export const useRouterProjects = () => {
  const router = useRouterNext();
  const { push } = router;

  const navigateToProjectsList = useCallback(
    (id: string, options?: Options) => {
      push(ROUTE_PROJECTS_LIST.href.pathname(id), options);
    },
    [push],
  );

  const navigateToProjectsTaskDetail = useCallback(
    (id: string, taskId: string, options?: Options) => {
      push(`${ROUTE_PROJECTS.href.pathname(id)}/${taskId}`, options);
    },
    [push],
  );

  const navigateToProjectsTaskDetailFeed = useCallback(
    (id: string, taskId: string, taskFeedId: string, options?: Options) => {
      push(
        `${ROUTE_PROJECTS.href.pathname(id)}/${taskId}/${taskFeedId}`,
        options,
      );
    },
    [push],
  );

  const navigateToProjectsBoard = useCallback(
    (id: string, options?: Options) => {
      push(ROUTE_PROJECTS_BOARD.href.pathname(id), options);
    },
    [push],
  );
  const navigateToProjectsCalendar = useCallback(
    (id: string, options?: Options) => {
      push(ROUTE_PROJECTS_CALENDAR.href.pathname(id), options);
    },
    [push],
  );
  const navigateToProjectsFiles = useCallback(
    (id: string, options?: Options) => {
      push(ROUTE_PROJECTS_FILES.href.pathname(id), options);
    },
    [push],
  );

  const navigateToProjectsOverview = useCallback(
    (id: string, options?: Options) => {
      push(ROUTE_PROJECTS_OVERVIEW.href.pathname(id), options);
    },
    [push],
  );

  return {
    navigateToProjectsList,
    navigateToProjectsBoard,
    navigateToProjectsCalendar,
    navigateToProjectsFiles,
    navigateToProjectsTaskDetail,
    navigateToProjectsTaskDetailFeed,
    navigateToProjectsOverview,
  };
};

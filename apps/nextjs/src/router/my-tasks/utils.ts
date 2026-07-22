import type { Params } from '@/lib/nextjs/navigation';
import {
  ROUTE_MY_TASKS,
  ROUTE_MY_TASKS_BOARD,
  ROUTE_MY_TASKS_CALENDAR,
  ROUTE_MY_TASKS_FILES,
  ROUTE_MY_TASKS_LIST,
  ROUTE_MY_TASKS_TASK,
} from './routes';

export const isMyTasksListURL = (pathname: string | null): boolean => {
  return pathname === ROUTE_MY_TASKS_LIST.href.pathname();
};

export const isMyTasksBoardURL = (pathname: string | null): boolean => {
  return pathname === ROUTE_MY_TASKS_BOARD.href.pathname();
};

export const isMyTasksCalendarURL = (pathname: string | null): boolean => {
  return pathname === ROUTE_MY_TASKS_CALENDAR.href.pathname();
};

export const isMyTasksFilesURL = (pathname: string | null): boolean => {
  return pathname === ROUTE_MY_TASKS_FILES.href.pathname();
};

export const isMyTasksDetailURL = (
  _: Params,
  pathname: string | null,
): boolean => {
  return ROUTE_MY_TASKS_TASK.regex.test(pathname || '');
};
export const isMyTasksDetailURLById = (
  _: Params,
  pathname: string | null,
  taskId: string,
): boolean => {
  return pathname === ROUTE_MY_TASKS_TASK.href.pathname(taskId);
};

export const getMyTasksDetailId = (
  params: Params,
  pathname: string | null,
): string =>
  (isMyTasksDetailURL(params, pathname) &&
    (params?.[ROUTE_MY_TASKS.query]?.[1] as string)) ||
  '';

export const getMyTasksDetailFeedId = (
  params: Params,
  pathname: string | null,
): string =>
  (isMyTasksDetailURL(params, pathname) &&
    (params?.[ROUTE_MY_TASKS.query]?.[3] as string)) ||
  '';

export const getMyTasksDetailFeedURL = (
  taskId: string,
  taskFeedId: string,
): string => {
  return `${
    window.location.origin
  }${ROUTE_MY_TASKS_TASK.href.pathname(taskId)}/feed/${taskFeedId}`;
};

import type { Params } from '@/shared/nextjs/navigation';
import {
  ROUTE_MY_TASKS,
  ROUTE_MY_TASKS_BOARD,
  ROUTE_MY_TASKS_CALENDAR,
  ROUTE_MY_TASKS_FILES,
  ROUTE_MY_TASKS_LIST,
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

// TODO: Should be verified
export const isMyTasksDetailURL = (
  params: Params,
  pathname: string | null,
): boolean => {
  return (
    !!params &&
    !!params[ROUTE_MY_TASKS.query]?.length &&
    !!params[ROUTE_MY_TASKS.query]?.[0] &&
    !isMyTasksListURL(pathname) &&
    !isMyTasksBoardURL(pathname) &&
    !isMyTasksCalendarURL(pathname) &&
    !isMyTasksFilesURL(pathname)
  );
};
export const isMyTasksDetailURLById = (
  params: Params,
  pathname: string | null,
  taskId: string,
): boolean => {
  return (
    !!params &&
    !!params[ROUTE_MY_TASKS.query]?.length &&
    !!params[ROUTE_MY_TASKS.query]?.[0] &&
    params[ROUTE_MY_TASKS.query]?.[0] === taskId &&
    !isMyTasksBoardURL(pathname) &&
    !isMyTasksCalendarURL(pathname) &&
    !isMyTasksFilesURL(pathname)
  );
};

export const getMyTasksDetailId = (
  params: Params,
  pathname: string | null,
): string =>
  (isMyTasksDetailURL(params, pathname) &&
    (params?.[ROUTE_MY_TASKS.query]?.[0] as string)) ||
  '';

export const getMyTasksDetailFeedId = (
  params: Params,
  pathname: string | null,
): string =>
  (isMyTasksDetailURL(params, pathname) &&
    (params?.[ROUTE_MY_TASKS.query]?.[1] as string)) ||
  '';

export const getMyTasksDetailFeedURL = (
  taskId: string,
  taskFeedId: string,
): string => {
  return `${
    window.location.origin
  }${ROUTE_MY_TASKS.href.pathname()}/${taskId}/${taskFeedId}`;
};

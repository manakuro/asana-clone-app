import { ROUTE_HOME } from './home';
import { ROUTE_INBOX } from './inbox';
import {
  ROUTE_MY_TASKS_BOARD,
  ROUTE_MY_TASKS_CALENDAR,
  ROUTE_MY_TASKS_FILES,
  ROUTE_MY_TASKS_LIST,
} from './myTasks';
import {
  ROUTE_PROJECTS_BOARD,
  ROUTE_PROJECTS_CALENDAR,
  ROUTE_PROJECTS_FILES,
  ROUTE_PROJECTS_LIST,
} from './projects';
import { ROUTE_WORKSPACES_OVERVIEW } from './workspace';

export { ROUTE_HOME } from './home';
export { ROUTE_INBOX } from './inbox';
export {
  ROUTE_MY_TASKS,
  ROUTE_MY_TASKS_BOARD,
  ROUTE_MY_TASKS_CALENDAR,
  ROUTE_MY_TASKS_FILES,
  ROUTE_MY_TASKS_LIST,
} from './myTasks';
export {
  ROUTE_PROJECTS_BOARD,
  ROUTE_PROJECTS_CALENDAR,
  ROUTE_PROJECTS_FILES,
  ROUTE_PROJECTS_LIST,
} from './projects';
export {
  ROUTE_WORKSPACES,
  ROUTE_WORKSPACES_CALENDAR,
  ROUTE_WORKSPACES_MESSAGES,
  ROUTE_WORKSPACES_OVERVIEW,
} from './workspace';

export const ROUTE_PORTFOLIOS = {
  regex: /^\/portfolios\/?$/iu,
  href: {
    pathname: () => '/portfolios' as const,
  },
} as const;
export const ROUTE_GOALS = {
  regex: /^\/goals\/?$/iu,
  href: {
    pathname: () => '/goals' as const,
  },
} as const;

const dynamicRoutes = [
  ROUTE_PROJECTS_LIST,
  ROUTE_PROJECTS_BOARD,
  ROUTE_PROJECTS_CALENDAR,
  ROUTE_PROJECTS_FILES,
  ROUTE_WORKSPACES_OVERVIEW,
] as const;

const staticRoutes = [
  ROUTE_HOME,
  ROUTE_MY_TASKS_LIST,
  ROUTE_MY_TASKS_BOARD,
  ROUTE_MY_TASKS_CALENDAR,
  ROUTE_MY_TASKS_FILES,
  ROUTE_PORTFOLIOS,
  ROUTE_INBOX,
  ROUTE_GOALS,
] as const;

export const routes = [...staticRoutes, ...dynamicRoutes] as const;

export type StaticRoutes = ReturnType<
  (typeof staticRoutes)[number]['href']['pathname']
>;

export type DynamicRoutes = ReturnType<
  (typeof dynamicRoutes)[number]['href']['pathnameObj']
>;

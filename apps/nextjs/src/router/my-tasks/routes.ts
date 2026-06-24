export const ROUTE_MY_TASKS = {
  regex: /^\/my_tasks\/?$/iu,
  href: {
    pathname: () => '/my_tasks' as const,
  },
  query: 'my_tasks',
} as const;
export const ROUTE_MY_TASKS_LIST = {
  regex: /^\/my_tasks\/list\/?$/iu,
  href: {
    pathname: () => '/my_tasks/list' as const,
  },
} as const;
export const ROUTE_MY_TASKS_BOARD = {
  regex: /^\/my_tasks\/board\/?$/iu,
  href: {
    pathname: () => '/my_tasks/board' as const,
  },
  query: 'board',
} as const;
export const ROUTE_MY_TASKS_CALENDAR = {
  regex: /^\/my_tasks\/calendar\/?$/iu,
  href: {
    pathname: () => '/my_tasks/calendar' as const,
  },
  query: 'calendar',
} as const;
export const ROUTE_MY_TASKS_FILES = {
  regex: /^\/my_tasks\/files\/?$/iu,
  href: {
    pathname: () => '/my_tasks/files' as const,
  },
  query: 'files',
} as const;

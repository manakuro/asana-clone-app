import { ulidRegex } from '@/utils/ulid';

export const ROUTE_HOME = {
  regex: /^\/$/iu,
  href: {
    pathname: () => '/' as const,
  },
  query: 'home',
} as const;
export const ROUTE_HOME_TASK = {
  regex: new RegExp(`^/task/${ulidRegex}/?`, 'iu'),
  href: {
    pathname: (id: string) => `/task/${id}`,
    pathnameObj: (id: string) =>
      ({
        pathname: '/task/[taskId]',
        query: { taskId: id },
      }) as const,
  },
  query: 'home',
} as const;

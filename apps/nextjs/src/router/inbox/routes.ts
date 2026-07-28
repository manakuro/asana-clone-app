import { ulidRegex } from '@/utils/ulid';

export const ROUTE_INBOX = {
  regex: /^\/inbox\/?$/iu,
  href: {
    pathname: () => '/inbox' as const,
  },
  query: 'inbox',
} as const;
export const ROUTE_INBOX_TASK = {
  regex: new RegExp(`^/inbox/task/${ulidRegex}/?`, 'iu'),
  href: {
    pathname: (id: string) => `/inbox/task/${id}`,
    pathnameObj: (id: string) =>
      ({
        pathname: '/inbox/task/[taskId]',
        query: { taskId: id },
      }) as const,
  },
  query: {
    taskId: 'taskId',
  },
} as const;

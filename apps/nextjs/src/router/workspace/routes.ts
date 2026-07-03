import { ulidRegex } from '@/utils/ulid';

export const ROUTE_WORKSPACES = {
  regex: new RegExp(`^/workspaces/${ulidRegex}/?$`, 'iu'),
  href: {
    pathname: (id: string) => `/workspaces/${id}`,
    pathnameObj: (id: string) =>
      ({
        pathname: '/workspaces/[workspaceId]',
        query: { workspaceId: id },
      }) as const,
  },
  query: {
    workspaceId: 'workspaceId',
    workspaces: 'workspaces',
  },
} as const;

export const ROUTE_WORKSPACES_OVERVIEW = {
  regex: new RegExp(`^/workspaces/${ulidRegex}/overview/?$`, 'iu'),
  href: {
    pathname: (id: string) => `/workspaces/${id}/overview`,
    pathnameObj: (id: string) =>
      ({
        pathname: '/workspaces/[workspaceId]/overview',
        query: { workspaceId: id },
      }) as const,
  },
  query: 'workspaces',
} as const;

export const ROUTE_WORKSPACES_MESSAGES = {
  regex: new RegExp(`^/workspaces/${ulidRegex}/messages/?$`, 'iu'),
  href: {
    pathname: (id: string) => `/workspaces/${id}/messages`,
    pathnameObj: (id: string) =>
      ({
        pathname: '/workspaces/[workspaceId]/messages',
        query: { workspaceId: id },
      }) as const,
  },
  query: 'workspaces',
} as const;
export const ROUTE_WORKSPACES_CALENDAR = {
  regex: new RegExp(`^/workspaces/${ulidRegex}/calendar/?$`, 'iu'),
  href: {
    pathname: (id: string) => `/workspaces/${id}/calendar`,
    pathnameObj: (id: string) =>
      ({
        pathname: '/workspaces/[workspaceId]/calendar',
        query: { workspaceId: id },
      }) as const,
  },
  query: 'workspaces',
} as const;

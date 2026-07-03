import { ulidRegex } from '@/utils/ulid';

export const ROUTE_PROJECTS = {
  regex: new RegExp(`^/projects/${ulidRegex}/?`, 'iu'),
  href: {
    pathname: (id: string) => `/projects/${id}`,
    pathnameObj: (id: string) =>
      ({
        pathname: '/projects/[projectId]',
        query: { projectId: id },
      }) as const,
  },
  query: {
    projectId: 'projectId',
    projects: 'projects',
  },
} as const;

export const ROUTE_PROJECTS_LIST = {
  regex: new RegExp(`^/projects/${ulidRegex}/list/?$`, 'iu'),
  href: {
    pathname: (id: string) => `/projects/${id}/list`,
    pathnameObj: (id: string) =>
      ({
        pathname: '/projects/[projectId]/list',
        query: { projectId: id },
      }) as const,
  },
  query: 'projects',
} as const;
export const ROUTE_PROJECTS_BOARD = {
  regex: new RegExp(`^/projects/${ulidRegex}/board/?$`, 'iu'),
  href: {
    pathname: (id: string) => `/projects/${id}/board`,
    pathnameObj: (id: string) =>
      ({
        pathname: '/projects/[projectId]/board',
        query: { projectId: id },
      }) as const,
  },
  query: 'projects',
} as const;
export const ROUTE_PROJECTS_CALENDAR = {
  regex: new RegExp(`^/projects/${ulidRegex}/calendar/?$`, 'iu'),
  href: {
    pathname: (id: string) => `/projects/${id}/calendar`,
    pathnameObj: (id: string) =>
      ({
        pathname: '/projects/[projectId]/calendar',
        query: { projectId: id },
      }) as const,
  },
  query: 'projects',
} as const;
export const ROUTE_PROJECTS_FILES = {
  regex: new RegExp(`^/projects/${ulidRegex}/files/?$`, 'iu'),
  href: {
    pathname: (id: string) => `/projects/${id}/files`,
    pathnameObj: (id: string) =>
      ({
        pathname: '/projects/[projectId]/files',
        query: { projectId: id },
      }) as const,
  },
  query: 'projects',
} as const;

export const ROUTE_PROJECTS_OVERVIEW = {
  regex: new RegExp(`^/projects/${ulidRegex}/overview/?$`, 'iu'),
  href: {
    pathname: (id: string) => `/projects/${id}/overview`,
    pathnameObj: (id: string) =>
      ({
        pathname: '/projects/[projectId]/overview',
        query: { projectId: id },
      }) as const,
  },
  query: 'projects',
} as const;

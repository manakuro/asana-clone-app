import type { Params } from '@/lib/nextjs/navigation';
import {
  ROUTE_WORKSPACES,
  ROUTE_WORKSPACES_CALENDAR,
  ROUTE_WORKSPACES_MESSAGES,
  ROUTE_WORKSPACES_OVERVIEW,
} from './routes';

export const isWorkspacesURL = (pathname: string | null): boolean => {
  return ROUTE_WORKSPACES.regex.test(pathname || '');
};

export const isWorkspacesMessageURL = (pathname: string | null): boolean => {
  return ROUTE_WORKSPACES_MESSAGES.regex.test(pathname || '');
};

export const isWorkspacesCalendarURL = (pathname: string | null): boolean => {
  return ROUTE_WORKSPACES_CALENDAR.regex.test(pathname || '');
};

export const isWorkspacesOverviewURL = (pathname: string | null): boolean => {
  return ROUTE_WORKSPACES_OVERVIEW.regex.test(pathname || '');
};

export const getWorkspacesIdFromURL = (
  params: Params,
  pathname: string | null,
): string =>
  (isWorkspacesURL(pathname) &&
    (params?.[ROUTE_WORKSPACES.query.workspaceId] as string)) ||
  '';

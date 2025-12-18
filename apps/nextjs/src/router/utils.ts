import type { UrlObject } from 'node:url';

export { getHomeDetailId, isHomeDetailURL } from './home';
export { getInboxDetailId, isInboxDetailURL } from './inbox';
export {
  getMyTasksDetailFeedId,
  getMyTasksDetailFeedURL,
  getMyTasksDetailId,
  isMyTasksBoardURL,
  isMyTasksCalendarURL,
  isMyTasksDetailURL,
  isMyTasksDetailURLById,
  isMyTasksFilesURL,
  isMyTasksListURL,
} from './myTasks';
export {
  getProjectsDetailFeedId,
  getProjectsDetailFeedURL,
  getProjectsDetailId,
  isProjectsBoardURL,
  isProjectsCalendarURL,
  isProjectsDetailURL,
  isProjectsDetailURLById,
  isProjectsFilesURL,
  isProjectsListURL,
} from './projects';
export { taskDetailURL } from './taskDetail';
export {
  getWorkspacesIdFromURL,
  isWorkspacesCalendarURL,
  isWorkspacesMessageURL,
  isWorkspacesOverviewURL,
  isWorkspacesURL,
} from './workspace';

export const convertPathnameObjToPathname = (urlObject: UrlObject): string => {
  const pathname = urlObject.pathname || '';
  const query = urlObject.query || {};

  const url = pathname
    .replace(/[[\]]/g, '')
    .split('/')
    .filter((t) => !!t)
    .map((t) => ((query as any)[t] ? (query as any)[t] : t))
    .join('/');

  return `/${url}`;
};

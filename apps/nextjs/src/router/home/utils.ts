import type { Params } from '@/lib/nextjs/navigation';
import { ROUTE_HOME, ROUTE_HOME_TASK } from './routes';

export const isHomeDetailURL = (pathname: string, _: Params): boolean => {
  return ROUTE_HOME_TASK.regex.test(pathname);
};
export const getHomeDetailId = (pathname: string, params: Params): string => {
  return (
    (isHomeDetailURL(pathname, params) &&
      (params?.[ROUTE_HOME.query]?.[1] as string)) ||
    ''
  );
};

'use client';
import type { Params } from '@/lib/nextjs/navigation';
import { ROUTE_INBOX, ROUTE_INBOX_TASK } from './routes';

export const isInboxDetailURL = (pathname: string): boolean => {
  return ROUTE_INBOX_TASK.regex.test(pathname);
};
export const getInboxDetailId = (pathname: string, params: Params): string => {
  return (
    (isInboxDetailURL(pathname) &&
      (params?.[ROUTE_INBOX.query]?.[1] as string)) ||
    ''
  );
};

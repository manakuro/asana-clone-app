'use client';
import type { Params } from '@/lib/nextjs/navigation';
import { ROUTE_INBOX } from './routes';

export const isInboxDetailURL = (params: Params): boolean => {
  return (
    !!params &&
    !!params[ROUTE_INBOX.query]?.length &&
    !!params[ROUTE_INBOX.query]?.[0]
  );
};
export const getInboxDetailId = (params: Params): string => {
  return (
    (isInboxDetailURL(params) &&
      (params?.[ROUTE_INBOX.query]?.[0] as string)) ||
    ''
  );
};

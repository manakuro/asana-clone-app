import type {
  InboxActivityPageQuery,
  InboxArchivePageQuery,
} from '@/graphql/types';

export type {
  InboxActivityPageQuery,
  InboxArchivePageQuery,
} from '@/graphql/types';
export type InboxActivityResponse = NonNullable<InboxActivityPageQuery>;
export type InboxArchiveResponse = NonNullable<InboxArchivePageQuery>;

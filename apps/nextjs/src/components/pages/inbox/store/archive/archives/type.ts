import type { ActivityTypeCodeValues } from '@/features/inbox/store/activity-type';
import type { ArchivedActivityResponse } from '@/graphql/types/archived-activity';

export type { ArchivedActivityResponse } from '@/graphql/types/archived-activity';

export type ArchiveActivity = Override<
  ArchivedActivityResponse,
  {
    type: ActivityTypeCodeValues;
  }
>;

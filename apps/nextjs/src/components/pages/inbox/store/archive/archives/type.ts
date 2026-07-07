import type { ArchivedActivityResponse } from '@/graphql/types/archived-activity';
import type { ActivityTypeCodeValues } from '@/store/entities/activity-type';

export type { ArchivedActivityResponse } from '@/graphql/types/archived-activity';

export type ArchiveActivity = Override<
  ArchivedActivityResponse,
  {
    type: ActivityTypeCodeValues;
  }
>;

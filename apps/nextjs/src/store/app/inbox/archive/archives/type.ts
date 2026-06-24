import type { ArchivedActivityResponse } from '@/graphql/types/archivedActivity';
import type { ActivityTypeCodeValues } from '@/store/entities/activity-type';

export type { ArchivedActivityResponse } from '@/graphql/types/archivedActivity';

export type ArchiveActivity = Override<
  ArchivedActivityResponse,
  {
    type: ActivityTypeCodeValues;
  }
>;

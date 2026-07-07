import type { ActivityTypeCodeValues } from '@/features/inbox/store/activity-type';
import type { ActivityResponse as Response } from '@/graphql/types/activity';

export type { ActivityResponse } from '@/graphql/types/activity';
export type Activity = Override<
  Response,
  {
    type: ActivityTypeCodeValues;
  }
>;

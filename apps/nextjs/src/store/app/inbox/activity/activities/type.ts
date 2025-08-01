import type { ActivityResponse as Response } from '@/graphql/types/activity';
import type { ActivityTypeCodeValues } from '@/store/entities/activityType';

export type { ActivityResponse } from '@/graphql/types/activity';
export type Activity = Override<
  Response,
  {
    type: ActivityTypeCodeValues;
  }
>;

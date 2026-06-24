import { createState } from '@/store/util';
import type { TaskActivity } from './type';

export const initialState = (): TaskActivity => ({
  id: '',
  activityTypeId: '',
  teammateId: '',
  createdAt: '',
  updatedAt: '',
});
export const {
  state: taskActivityState,
  listState: taskActivitiesState,
  idsState: taskActivityIdsState,
} = createState({ initialState });

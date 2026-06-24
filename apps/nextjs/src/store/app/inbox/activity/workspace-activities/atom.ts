import { createState } from '@/store/util';
import type { WorkspaceActivity } from './type';

export const initialState = (): WorkspaceActivity => ({
  id: '',
  activityTypeId: '',
  workspaceId: '',
  projectId: '',
  teammateId: '',
  createdAt: '',
  updatedAt: '',
});
export const {
  state: workspaceActivityState,
  listState: workspaceActivitiesState,
  idsState: workspaceActivityIdsState,
} = createState({ initialState });

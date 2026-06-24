import { createState } from '@/store/util';
import type { ArchivedWorkspaceActivity } from './type';

export const initialState = (): ArchivedWorkspaceActivity => ({
  id: '',
  activityTypeId: '',
  workspaceId: '',
  projectId: '',
  teammateId: '',
  createdAt: '',
  updatedAt: '',
});

export const {
  state: archivedWorkspaceActivityState,
  listState: archivedWorkspaceActivitiesState,
  idsState: archivedWorkspaceActivityIdsState,
} = createState({ initialState });

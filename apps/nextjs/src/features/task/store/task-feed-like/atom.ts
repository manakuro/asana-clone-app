import { createState } from '@/lib/jotai';
import type { TaskFeedLike } from './type';

export const initialState = (): TaskFeedLike => ({
  id: '',
  taskId: '',
  taskFeedId: '',
  teammateId: '',
  createdAt: '',
  updatedAt: '',
});

export const {
  state: taskFeedLikeState,
  listState: taskFeedLikesState,
  idsState: taskFeedLikeIdsState,
} = createState({ initialState });

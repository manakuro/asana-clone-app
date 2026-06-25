import { atom } from 'jotai';
import { createState } from '@/store/util';
import type { TaskLike } from './type';

export const initialState = (): TaskLike => ({
  id: '',
  taskId: '',
  teammateId: '',
  workspaceId: '',
  createdAt: '',
  updatedAt: '',
});
export const {
  state: taskLikeState,
  listState: taskLikesState,
  idsState: taskLikeIdsState,
} = createState({ initialState });

export const taskLikesByTaskIdState = (taskId: string) =>
  atom<TaskLike[]>((get) => {
    const taskLikes = get(taskLikesState);
    return taskLikes.filter((t) => t.taskId === taskId);
  });

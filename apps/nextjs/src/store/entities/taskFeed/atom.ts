import { atom } from 'jotai';
import { getDefaultDescription } from '@/shared/prosemirror/getDefaultDescription';
import { createState } from '@/store/util';
import type { TaskFeed } from './type';

export const initialState = (): TaskFeed => ({
  id: '',
  taskId: '',
  teammateId: '',
  description: getDefaultDescription(),
  createdAt: '',
  updatedAt: '',
  isFirst: false,
  isPinned: false,
});

export const {
  state: taskFeedState,
  listState: taskFeedsState,
  idsState: taskFeedIdsState,
} = createState({ initialState });

export const taskFeedIdsByTaskIdState = (taskId: string) =>
  atom<string[]>((get) => {
    let taskFeeds = [...get(taskFeedsState)];
    taskFeeds = taskFeeds.filter((p) => p.taskId === taskId);
    taskFeeds = taskFeeds.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
    });
    return taskFeeds.map((p) => p.id);
  });
export const taskFeedIdsWithoutFirstState = (taskId: string) =>
  atom<string[]>((get) => {
    const taskFeeds = get(taskFeedsState);
    return taskFeeds
      .filter((p) => p.taskId === taskId && !p.isFirst)
      .map((p) => p.id);
  });

export const taskFeedPinnedIdsState = (taskId: string) =>
  atom<string[]>((get) => {
    const ids = get(taskFeedIdsState);
    return ids.filter((id) => {
      const taskFeed = get(taskFeedState(id));
      return taskFeed.isPinned && taskFeed.taskId === taskId;
    });
  });

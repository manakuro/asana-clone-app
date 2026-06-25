import { atom } from 'jotai';
import { createState } from '@/store/util';
import type { TaskTag } from './type';

export const initialState = (): TaskTag => ({
  id: '',
  tagId: '',
  tag: {
    id: '',
    name: '',
    color: {
      id: '',
      name: '',
      color: '',
      createdAt: '',
      updatedAt: '',
    },
    createdAt: '',
    updatedAt: '',
  },
  taskId: '',
  createdAt: '',
  updatedAt: '',
});

export const {
  state: taskTagState,
  listState: taskTagsState,
  idsState: taskTagIdsState,
} = createState({ initialState });

export const taskTagIdsByTaskIdState = (taskId: string) =>
  atom<string[]>((get) => {
    const tags = get(taskTagsState);
    return tags.filter((t) => t.taskId === taskId).map((p) => p.id);
  });

export const taskTagByTaskIdAndTagIdState = ({
  taskId,
  tagId,
}: {
  taskId: string;
  tagId: string;
}) =>
  atom<TaskTag>((get) => {
    const taskTags = get(taskTagsState);
    return (
      taskTags.find((t) => t.tagId === tagId && t.taskId === taskId) ||
      initialState()
    );
  });

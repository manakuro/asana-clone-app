import { createState } from '@/store/util';
import type { TaskPriority } from './type';
import { TaskPriorityType } from './types';

export const initialState = (): TaskPriority => ({
  id: '',
  name: '',
  priorityType: TaskPriorityType.Low,
  color: {
    id: '',
    name: '',
    color: '',
    createdAt: '',
    updatedAt: '',
  },
  createdAt: '',
  updatedAt: '',
});

export const {
  state: taskPriorityState,
  listState: taskPrioritiesState,
  idsState: taskPriorityIdsState,
} = createState({ initialState });

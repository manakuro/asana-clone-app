import { atom } from 'jotai';
import { createState } from '@/store/util';
import {
  type TaskColumn,
  TaskColumnType,
  type TaskColumnTypeValue,
} from './type';

export const initialState = (): TaskColumn => ({
  id: '',
  name: '',
  type: TaskColumnType.TaskName,
  createdAt: '',
  updatedAt: '',
});

export const {
  state: taskColumnState,
  listState: taskColumnsState,
  idsState: taskColumnIdsState,
} = createState({ initialState });

export const taskColumnByTypeState = (type: TaskColumnTypeValue) =>
  atom<TaskColumn>((get) => {
    const taskColumns = get(taskColumnsState);
    return taskColumns.find((t) => t.type === type) || initialState();
  });

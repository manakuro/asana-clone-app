import { atom } from 'jotai';
import {
  type TaskColumnTypeValue,
  taskColumnByTypeState,
} from '@/store/entities/taskColumn';
import { createState } from '@/store/util';
import type { TeammateTaskColumn } from './type';

export const initialState = (): TeammateTaskColumn => ({
  id: '',
  taskColumnId: '',
  teammateId: '',
  width: '',
  disabled: false,
  customizable: false,
  order: 0,
  createdAt: '',
  updatedAt: '',
});
export const {
  state: teammateTaskColumnState,
  listState: teammateTaskColumnsState,
  idsState: teammateTaskColumnIdsState,
} = createState({ initialState });

export const teammatesTaskColumnsByTeammateIdState = (teammateId: string) =>
  atom<TeammateTaskColumn[]>((get) => {
    const taskColumns = get(teammateTaskColumnsState);
    return taskColumns.filter((t) => t.teammateId === teammateId);
  });

export const teammatesTaskColumnByTypeState = ({
  teammateId,
  type,
}: {
  teammateId: string;
  type: TaskColumnTypeValue;
}) =>
  atom<TeammateTaskColumn>((get) => {
    const taskColumn = get(taskColumnByTypeState(type));
    const taskColumns = get(teammateTaskColumnsState);
    return (
      taskColumns.find(
        (t) => t.teammateId === teammateId && t.taskColumnId === taskColumn.id,
      ) ?? initialState()
    );
  });

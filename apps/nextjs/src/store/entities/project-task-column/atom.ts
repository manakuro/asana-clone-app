import { atom } from 'jotai';
import { createState } from '@/lib/jotai';
import type { TaskColumnTypeValue } from '@/store/entities/task-column';
import { taskColumnByTypeState } from '@/store/entities/task-column';
import type { ProjectTaskColumn } from './type';

export const initialState = (): ProjectTaskColumn => ({
  id: '',
  taskColumnId: '',
  projectId: '',
  width: '',
  disabled: false,
  customizable: false,
  order: 0,
  createdAt: '',
  updatedAt: '',
});

export const {
  state: projectTaskColumnState,
  listState: projectTaskColumnsState,
  idsState: projectTaskColumnIdsState,
} = createState({ initialState });

export const projectsTaskColumnsByProjectIdState = (projectId: string) =>
  atom<ProjectTaskColumn[]>((get) => {
    const taskColumns = get(projectTaskColumnsState);
    return taskColumns.filter((t) => t.projectId === projectId);
  });

export const projectsTaskColumnByTypeState = ({
  projectId,
  type,
}: {
  projectId: string;
  type: TaskColumnTypeValue;
}) =>
  atom<ProjectTaskColumn>((get) => {
    const taskColumn = get(taskColumnByTypeState(type));
    const taskColumns = get(projectTaskColumnsState);
    return (
      taskColumns.find(
        (t) => t.projectId === projectId && t.taskColumnId === taskColumn.id,
      ) ?? initialState()
    );
  });

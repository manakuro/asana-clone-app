import { atom } from 'jotai';
import { createState } from '@/store/util';
import type { TaskCollaborator } from './type';

export const initialState = (): TaskCollaborator => ({
  id: '',
  taskId: '',
  teammateId: '',
  createdAt: '',
  updatedAt: '',
});
export const {
  state: taskCollaboratorState,
  listState: taskCollaboratorsState,
} = createState({ initialState });

export const teammateIdsByTaskIdState = (taskId: string) =>
  atom<string[]>((get) => {
    const taskCollaborators = get(taskCollaboratorsState);
    return taskCollaborators
      .filter((t) => t.taskId === taskId)
      .map((p) => p.teammateId);
  });

export const taskCollaboratorByTaskIdAndTeammateId = ({
  taskId,
  teammateId,
}: {
  taskId: string;
  teammateId: string;
}) =>
  atom<TaskCollaborator>((get) => {
    const taskCollaborators = get(taskCollaboratorsState);
    return (
      taskCollaborators.find(
        (t) => t.taskId === taskId && t.teammateId === teammateId,
      ) || initialState()
    );
  });

import { atom } from 'jotai';
import { teammateTaskByTaskIdState } from '@/store/entities/teammateTask';
import { createState } from '@/store/util';
import type { TeammateTaskSection } from './type';

export const initialState = (): TeammateTaskSection => ({
  id: '',
  name: '',
  teammateId: '',
  assigned: false,
  isNew: false,
  createdAt: '',
  updatedAt: '',
});
export const {
  state: teammatesTaskSectionState,
  listState: teammatesTaskSectionsState,
} = createState({ initialState });

export const taskSectionsByTeammateIdState = (teammateId: string) =>
  atom<TeammateTaskSection[]>((get) => {
    const teammatesTaskSections = get(teammatesTaskSectionsState);
    return teammatesTaskSections.filter((t) => t.teammateId === teammateId);
  });

export const teammateTaskSectionByTaskIdState = (taskId: string) =>
  atom<TeammateTaskSection>((get) => {
    const teammateTask = get(teammateTaskByTaskIdState(taskId));
    const teammatesTaskSections = get(teammatesTaskSectionsState);
    return (
      teammatesTaskSections.find(
        (t) => t.id === teammateTask.teammateTaskSectionId,
      ) || initialState()
    );
  });

import { atom } from 'jotai';
import { teammatesTaskColumnsByTeammateIdState } from '@/store/entities/teammateTaskColumn';

export const taskColumnIdsState = (teammateId: string) =>
  atom<string[]>((get) => {
    const taskColumns = get(teammatesTaskColumnsByTeammateIdState(teammateId));

    return taskColumns
      .filter((t) => !t.disabled)
      .sort((a, b) => (a.order > b.order ? 1 : -1))
      .map((t) => t.id);
  });

export const taskColumnIdsCustomizableState = (teammateId: string) =>
  atom<string[]>((get) => {
    const taskColumns = get(teammatesTaskColumnsByTeammateIdState(teammateId));
    return [...taskColumns]
      .sort((a, b) => (a.order > b.order ? 1 : -1))
      .map((t) => t.id);
  });

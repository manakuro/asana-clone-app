import { atom } from 'jotai';
import { createState } from '@/store/util';
import type { Teammate } from './type';

export const initialState = (): Teammate => ({
  id: '',
  image: '',
  email: '',
  name: '',
  createdAt: '',
  updatedAt: '',
});
export const {
  state: teammateState,
  listState: teammatesState,
  idsState: teammateIdsState,
} = createState({ initialState });

export const namesByTeammateIdState = (teammateIds: string[]) =>
  atom<string[]>((get) => {
    const teammates = get(teammatesState);
    return teammates
      .filter((t) => teammateIds.includes(t.id))
      .map((t) => t.name);
  });

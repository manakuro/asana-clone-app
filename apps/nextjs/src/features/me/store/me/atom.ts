import { atomWithReset } from 'jotai/utils';
import type { Me } from './type';

export const initialMeState = (): Me => ({
  id: '',
  name: '',
  image: '',
  email: '',
  createdAt: '',
  updatedAt: '',
});

export const meState = atomWithReset<Me>(initialMeState());

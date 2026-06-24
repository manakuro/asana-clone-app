import { createState } from '@/store/util';
import type { ProjectBaseColor } from './type';

export const initialState = (): ProjectBaseColor => ({
  id: '',
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
  state: projectBaseColorState,
  listState: projectBaseColorsState,
  idsState: projectBaseColorIdsState,
} = createState({ initialState });

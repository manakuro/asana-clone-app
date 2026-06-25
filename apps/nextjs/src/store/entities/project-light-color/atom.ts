import { createState } from '@/store/util';
import type { ProjectLightColor } from './type';

export const initialState = (): ProjectLightColor => ({
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
  state: projectLightColorState,
  listState: projectLightColorsState,
  idsState: projectLightColorIdsState,
} = createState({ initialState });

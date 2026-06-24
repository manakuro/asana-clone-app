import { createState } from '@/store/util';
import type { ProjectIcon } from './type';

export const initialState = (): ProjectIcon => ({
  id: '',
  icon: {
    id: '',
    name: '',
    icon: '',
    createdAt: '',
    updatedAt: '',
  },
  createdAt: '',
  updatedAt: '',
});

export const {
  state: projectIconState,
  listState: projectIconsState,
  idsState: projectIconIdsState,
} = createState({ initialState });

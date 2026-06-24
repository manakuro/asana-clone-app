import { getDefaultDescription } from '@/shared/prosemirror/get-default-description';
import { createState } from '../../util';
import type { Project } from './type';

export const initialState = (): Project => ({
  id: '',
  name: '',
  projectBaseColorId: '',
  projectLightColorId: '',
  projectIconId: '',
  teammateIds: [],
  description: getDefaultDescription(),
  descriptionTitle: '',
  dueDate: '',
  createdBy: '',
  createdAt: '',
  updatedAt: '',
});

export const {
  state: projectState,
  listState: projectsState,
  idsState: projectIdsState,
} = createState({ initialState });

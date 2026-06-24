import { atom } from 'jotai';
import { getDefaultDescription } from '@/shared/prosemirror/get-default-description';
import type { Workspace } from './type';

export const workspaceStateDefault = (): Workspace => ({
  id: '',
  name: '',
  description: getDefaultDescription(),
  createdBy: '',
  createdAt: '',
  updatedAt: '',
});

export const workspaceState = atom<Workspace>(workspaceStateDefault());

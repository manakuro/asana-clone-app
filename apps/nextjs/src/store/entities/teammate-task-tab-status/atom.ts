import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import {
  type TeammateTaskTabStatus,
  TeammateTaskTabStatusCode,
  type TeammateTaskTabStatusCodeKey,
} from './type';

export const initialState = (): TeammateTaskTabStatus => ({
  id: '',
  teammateId: '',
  workspaceId: '',
  statusCode: TeammateTaskTabStatusCode.List,
  createdAt: '',
  updatedAt: '',
});

export const tabStatusState = atomWithReset<TeammateTaskTabStatus>(
  initialState(),
);

export const isTabStatusState = (key: TeammateTaskTabStatusCodeKey) =>
  atom<boolean>((get) => {
    const taskStatus = get(tabStatusState);
    return TeammateTaskTabStatusCode[key] === taskStatus.statusCode;
  });

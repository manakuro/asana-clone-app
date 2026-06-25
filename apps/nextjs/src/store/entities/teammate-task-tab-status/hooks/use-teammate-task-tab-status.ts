import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { tabStatusState } from '../atom';
import {
  TeammateTaskTabStatusCode,
  type TeammateTaskTabStatusCodeKey,
} from '../type';

export const useTeammateTaskTabStatus = () => {
  const state = useAtomValue(tabStatusState);

  const isTabStatus = useCallback(
    (key: TeammateTaskTabStatusCodeKey) =>
      state.statusCode === TeammateTaskTabStatusCode[key],
    [state.statusCode],
  );

  return {
    teammateTaskTabStatus: state,
    isTabStatus,
  };
};

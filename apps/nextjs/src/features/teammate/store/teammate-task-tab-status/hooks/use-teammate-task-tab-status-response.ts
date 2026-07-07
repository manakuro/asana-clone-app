import { useCallback } from 'react';
import type { TeammateTaskTabStatus } from '@/features/teammate/store/teammate-task-tab-status';
import { useUpsert } from './use-upsert';

export const useTeammateTaskTabStatusResponse = () => {
  const { upsert } = useUpsert();

  const setTeammateTaskTabStatus = useCallback(
    (data: TeammateTaskTabStatus) => {
      upsert(data);
    },
    [upsert],
  );

  return {
    setTeammateTaskTabStatus,
  };
};

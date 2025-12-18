import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import {
  type TeammateTaskResponse,
  useTeammateTaskResponse,
} from '@/store/entities/teammateTask';
import type { HomeResponse } from '../type';

export const useHomeResponse = () => {
  const { setTeammateTask } = useTeammateTaskResponse();
  const setHome = useAtomCallback(
    useCallback(
      (_get, _set, data: HomeResponse) => {
        setTeammateTask(data.tasksDueSoon as TeammateTaskResponse[]);
      },
      [setTeammateTask],
    ),
  );

  return {
    setHome,
  };
};

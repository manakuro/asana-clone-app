import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { teammateTaskState } from '../atom';
import type { TeammateTask } from '../type';

export const useTeammateTask = (teammateTaskId: string) => {
  const teammateTask = useAtomValue(teammateTaskState(teammateTaskId));

  const setTeammateTask = useAtomCallback(
    useCallback(
      (get, set, input: Partial<TeammateTask>) => {
        const prev = get(teammateTaskState(teammateTask.id));
        const updated = {
          ...prev,
          ...input,
        };
        set(teammateTaskState(teammateTask.id), updated);
      },
      [teammateTask.id],
    ),
  );

  return {
    teammateTask,
    setTeammateTask,
  };
};

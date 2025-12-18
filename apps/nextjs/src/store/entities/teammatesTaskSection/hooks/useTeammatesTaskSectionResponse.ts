import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { uniqBy } from '@/shared/utils';
import {
  type TeammateTaskResponse,
  useTeammateTaskResponse,
} from '@/store/entities/teammateTask';
import { teammatesTaskSectionState } from '../atom';
import type { TeammateTaskSectionResponse } from '../type';

export const useTeammatesTaskSectionResponse = () => {
  const { setTeammateTask } = useTeammateTaskResponse();

  const setTeammatesTaskSections = useAtomCallback(
    useCallback(
      (
        get,
        set,
        data: TeammateTaskSectionResponse[],
        options?: { includeTeammateTask?: boolean; includeTask?: boolean },
      ) => {
        const includeTeammateTask = options?.includeTeammateTask ?? true;
        const includeTask = options?.includeTask ?? true;

        data.forEach((d) => {
          const prev = get(teammatesTaskSectionState(d.id));
          set(teammatesTaskSectionState(d.id), {
            ...prev,
            ...d,
          });
        });
        if (!includeTeammateTask) return;

        const teammateTasks = data.reduce<TeammateTaskResponse[]>((acc, p) => {
          acc.push(...p.teammateTasks);
          return acc;
        }, []);

        setTeammateTask(uniqBy(teammateTasks, 'id'), { includeTask });
      },
      [setTeammateTask],
    ),
  );

  return {
    setTeammatesTaskSections,
  };
};

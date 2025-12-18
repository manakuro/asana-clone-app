import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { useTaskColumnsResponse } from '@/store/entities/taskColumn';
import { teammateTaskColumnState } from '../atom';
import type { TeammateTaskColumnResponse } from '../type';

export const useTeammateTaskColumnResponse = () => {
  const { setTaskColumns } = useTaskColumnsResponse();

  const setTeammatesTaskColumns = useAtomCallback(
    useCallback(
      (_get, set, data: TeammateTaskColumnResponse[]) => {
        data.forEach((p) => {
          set(teammateTaskColumnState(p.id), p);
        });

        const taskColumns = data.map((d) => d.taskColumn);
        setTaskColumns(taskColumns);
      },
      [setTaskColumns],
    ),
  );

  return {
    setTeammatesTaskColumns,
  };
};

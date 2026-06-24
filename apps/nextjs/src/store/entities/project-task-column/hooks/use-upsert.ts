import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectTaskColumnState } from '../atom';
import type { ProjectTaskColumn } from '../type';

export const UseUpsert = () => {
  const upsert = useAtomCallback(
    useCallback(
      (get, set, taskColumn: Partial<ProjectTaskColumn> & { id: string }) => {
        const prev = get(projectTaskColumnState(taskColumn.id));
        set(projectTaskColumnState(taskColumn.id), {
          ...prev,
          ...taskColumn,
        });
      },
      [],
    ),
  );

  return {
    upsert,
  };
};

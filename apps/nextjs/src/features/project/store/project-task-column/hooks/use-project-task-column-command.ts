import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectTaskColumnState } from '../atom';
import type { ProjectTaskColumn } from '../type';
import { UseUpsert } from './use-upsert';

export const useProjectTaskColumnCommand = () => {
  const { upsert } = UseUpsert();

  const setProjectsTaskColumn = useAtomCallback(
    useCallback(
      async (get, _set, input: Partial<ProjectTaskColumn> & { id: string }) => {
        const prev = get(projectTaskColumnState(input.id));
        upsert({ ...prev, ...input });
      },
      [upsert],
    ),
  );

  const setProjectTaskColumnOrder = useAtomCallback(
    useCallback(
      (_, _set, ids: string[]) => {
        ids.forEach((id, index) => {
          upsert({
            id,
            order: index,
          });
        });
      },
      [upsert],
    ),
  );

  return {
    upsert,
    setProjectsTaskColumn,
    setProjectTaskColumnOrder,
  };
};

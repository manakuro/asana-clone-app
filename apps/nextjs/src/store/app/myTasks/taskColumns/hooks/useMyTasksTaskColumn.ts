import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useMemo } from 'react';
import { useMe } from '@/store/entities/me';
import {
  type TeammateTaskColumn,
  useTeammateTaskColumn,
  useTeammateTaskColumnCommand,
} from '@/store/entities/teammateTaskColumn';
import { taskColumnIdsState } from '../atom';

export const useMyTasksTaskColumn = (tasksTaskColumnId: string) => {
  const { me } = useMe();
  const { teammatesTaskColumn } = useTeammateTaskColumn(tasksTaskColumnId);
  const { setTeammateTaskColumn, setTeammateTaskColumnOrder } =
    useTeammateTaskColumnCommand();
  const ids = useAtomValue(useMemo(() => taskColumnIdsState(me.id), [me.id]));
  const setTasksTaskColumn = useCallback(
    async (input: Partial<TeammateTaskColumn>) => {
      await setTeammateTaskColumn({ id: tasksTaskColumnId, ...input });
    },
    [setTeammateTaskColumn, tasksTaskColumnId],
  );

  const setTaskColumnOrder = useAtomCallback(
    useCallback(
      async (_get, _set, startIndex: number, endIndex: number) => {
        const newIds = Array.from(ids);
        const [deleted] = newIds.splice(startIndex, 1);
        newIds.splice(endIndex, 0, deleted);

        setTeammateTaskColumnOrder(newIds);
      },
      [ids, setTeammateTaskColumnOrder],
    ),
  );

  const canMoveLeft = useAtomCallback(
    useCallback(
      (_get, _set, id: string) => {
        const currentIndex = ids.indexOf(id);
        return currentIndex > 1;
      },
      [ids],
    ),
  );

  const canMoveRight = useAtomCallback(
    useCallback(
      (_get, _set, id: string) => {
        const currentIndex = ids.indexOf(id);
        return currentIndex !== ids.length - 1;
      },
      [ids],
    ),
  );

  return {
    tasksTaskColumn: teammatesTaskColumn,
    setTasksTaskColumn,
    setTaskColumnOrder,
    canMoveLeft,
    canMoveRight,
  };
};

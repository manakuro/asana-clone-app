import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useMemo } from 'react';
import { useProjectsProjectId } from '@/store/app/projects/project';
import {
  type ProjectTaskColumn,
  useProjectTaskColumn,
  useProjectTaskColumnCommand,
} from '@/store/entities/projectTaskColumn';
import { projectsTaskColumnIdsState } from '../atom';

export const useProjectsTaskColumns = (tasksTaskColumnId: string) => {
  const { projectId } = useProjectsProjectId();
  const ids = useAtomValue(
    useMemo(() => projectsTaskColumnIdsState(projectId), [projectId]),
  );
  const { projectsTaskColumn } = useProjectTaskColumn(tasksTaskColumnId);
  const { setProjectsTaskColumn, setProjectTaskColumnOrder } =
    useProjectTaskColumnCommand();

  const setTasksTaskColumn = useCallback(
    async (input: Partial<ProjectTaskColumn>) => {
      await setProjectsTaskColumn({ id: tasksTaskColumnId, ...input });
    },
    [setProjectsTaskColumn, tasksTaskColumnId],
  );

  const setTaskColumnOrder = useAtomCallback(
    useCallback(
      async (_get, _set, startIndex: number, endIndex: number) => {
        const newIds = Array.from(ids);
        const [deleted] = newIds.splice(startIndex, 1);
        newIds.splice(endIndex, 0, deleted);

        setProjectTaskColumnOrder(newIds);
      },
      [ids, setProjectTaskColumnOrder],
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
    tasksTaskColumn: projectsTaskColumn,
    setTasksTaskColumn: setTasksTaskColumn,
    setTaskColumnOrder,
    canMoveLeft,
    canMoveRight,
  };
};

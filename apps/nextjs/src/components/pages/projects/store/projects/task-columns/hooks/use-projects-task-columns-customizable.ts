import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useMemo } from 'react';
import { useProjectsProjectId } from '@/components/pages/projects/store/projects/project';
import { useProjectTaskColumnCommand } from '@/features/project/store/project-task-column';
import { projectsTaskColumnIdsCustomizableState } from '../atom';

export const useProjectsTaskColumnsCustomizable = () => {
  const { projectId } = useProjectsProjectId();
  const ids = useAtomValue(
    useMemo(
      () => projectsTaskColumnIdsCustomizableState(projectId),
      [projectId],
    ),
  );
  const tasksTaskColumnIds = useMemo(() => ids, [ids]);
  const { setProjectTaskColumnOrder } = useProjectTaskColumnCommand();

  const setTaskColumnOrder = useAtomCallback(
    useCallback(
      (_get, _set, updatedIds: string[]) => {
        setProjectTaskColumnOrder(updatedIds);
      },
      [setProjectTaskColumnOrder],
    ),
  );

  return {
    tasksTaskColumnIds,
    setTaskColumnOrder,
  };
};

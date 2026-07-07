import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { projectTaskColumnState as state } from '../atom';

export const useProjectTaskColumn = (projectTaskColumnId: string) => {
  const projectsTaskColumn = useAtomValue(
    useMemo(() => state(projectTaskColumnId), [projectTaskColumnId]),
  );

  return {
    projectsTaskColumn,
  };
};

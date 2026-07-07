import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { projectTaskSectionByTaskIdAndProjectIdState } from '../atom';

export const useProjectTaskSectionByTaskIdAndProjectId = (props: {
  taskId: string;
  projectId: string;
}) => {
  const projectTaskSection = useAtomValue(
    useMemo(() => projectTaskSectionByTaskIdAndProjectIdState(props), [props]),
  );

  return {
    projectTaskSection,
  };
};

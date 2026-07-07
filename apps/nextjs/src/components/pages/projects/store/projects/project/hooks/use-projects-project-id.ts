import { useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { projectIdState } from '../atom';

export const useProjectsProjectId = () => {
  const [projectId, setProjectId] = useAtom(projectIdState);
  const resetProjectId = useResetAtom(projectIdState);

  return {
    projectId,
    resetProjectId,
    setProjectId,
  };
};

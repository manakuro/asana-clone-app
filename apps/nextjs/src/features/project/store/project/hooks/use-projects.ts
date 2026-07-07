import { useAtomValue } from 'jotai';
import { projectsState } from '../atom';

export const useProjects = () => {
  const projects = useAtomValue(projectsState);

  return {
    projects,
  };
};

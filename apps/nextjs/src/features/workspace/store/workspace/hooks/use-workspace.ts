import { useAtom } from 'jotai';
import { workspaceState } from '../atom';
import { useHasDescriptionUpdated } from './use-has-description-updated';

export const useWorkspace = () => {
  const [workspace, setVal] = useAtom(workspaceState);

  const { hasDescriptionUpdated } = useHasDescriptionUpdated();

  return {
    workspace,
    setWorkspace: setVal,
    hasDescriptionUpdated,
  };
};

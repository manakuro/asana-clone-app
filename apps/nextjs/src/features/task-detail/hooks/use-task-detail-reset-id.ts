import { useResetAtom } from 'jotai/utils';
import { idAtom } from './use-task-detail';

export const useTaskDetailResetId = () => {
  const resetId = useResetAtom(idAtom);

  return {
    resetId,
  };
};

import { useResetAtom } from 'jotai/utils';
import { idAtom } from './useTaskDetail';

export const useTaskDetailResetId = () => {
  const resetId = useResetAtom(idAtom);

  return {
    resetId,
  };
};

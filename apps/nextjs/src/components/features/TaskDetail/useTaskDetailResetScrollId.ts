import { useResetAtom } from 'jotai/utils';
import { scrollIdAtom } from './useTaskDetail';

export const useTaskDetailResetScrollId = () => {
  const resetScrollId = useResetAtom(scrollIdAtom);

  return {
    resetScrollId,
  };
};

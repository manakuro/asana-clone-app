import { useResetAtom } from 'jotai/utils';
import { scrollIdAtom } from './use-task-detail';

export const useTaskDetailResetScrollId = () => {
  const resetScrollId = useResetAtom(scrollIdAtom);

  return {
    resetScrollId,
  };
};

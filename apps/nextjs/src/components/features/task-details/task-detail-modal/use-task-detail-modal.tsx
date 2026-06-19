import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';
import {
  useTaskDetailResetId,
  useTaskDetailResetScrollId,
} from '@/components/features/TaskDetail';

const isOpenAtom = atom(false);

export const useTaskDetailModal = () => {
  const { resetScrollId } = useTaskDetailResetScrollId();
  const { resetId } = useTaskDetailResetId();
  const [open, setIsOpen] = useAtom(isOpenAtom);

  const onClose = useCallback(() => {
    setIsOpen(false);
    resetId();
    resetScrollId();
  }, [resetId, resetScrollId, setIsOpen]);

  const onOpen = useCallback(
    (callback?: () => void) => {
      setIsOpen(true);
      callback?.();
    },
    [setIsOpen],
  );

  return {
    open,
    onOpen,
    onClose,
  };
};

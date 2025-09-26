import {
  useTaskDetailResetId,
  useTaskDetailResetScrollId,
} from '@/components/features/TaskDetail';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const isOpenAtom = atom(false);

export const useTaskDetailModal = () => {
  const { resetScrollId } = useTaskDetailResetScrollId();
  const { resetId } = useTaskDetailResetId();
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);

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
    isOpen,
    onOpen,
    onClose,
  };
};

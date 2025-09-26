import {
  useTaskDetail,
  useTaskDetailResetId,
  useTaskDetailResetScrollId,
} from '@/components/features/TaskDetail';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const isOpenAtom = atom<boolean>(false);

export const useTaskDetailSide = () => {
  const { resetScrollId } = useTaskDetailResetScrollId();
  const { taskId } = useTaskDetail();
  const { resetId } = useTaskDetailResetId();
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);

  const onClose = useCallback(async () => {
    setIsOpen(false);
    resetId();
    resetScrollId();
  }, [setIsOpen, resetId, resetScrollId]);

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
    taskId,
  };
};

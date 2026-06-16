import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';
import {
  useTaskDetail,
  useTaskDetailResetId,
  useTaskDetailResetScrollId,
} from '@/components/features/TaskDetail';

const isOpenAtom = atom<boolean>(false);

export const useTaskDetailSide = () => {
  const { resetScrollId } = useTaskDetailResetScrollId();
  const { taskId } = useTaskDetail();
  const { resetId } = useTaskDetailResetId();
  const [open, setIsOpen] = useAtom(isOpenAtom);

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
    open,
    onOpen,
    onClose,
    taskId,
  };
};

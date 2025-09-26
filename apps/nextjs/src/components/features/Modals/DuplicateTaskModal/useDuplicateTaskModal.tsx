import { atom, useAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';
import { useCallback } from 'react';

const state = atom(false);

const taskIdState = atomWithReset<string>('');

export const useDuplicateTaskModal = () => {
  const [isOpen, setIsOpen] = useAtom(state);
  const [taskId, setTaskId] = useAtom(taskIdState);
  const resetTaskId = useResetAtom(taskIdState);

  const onClose = useCallback(() => {
    setIsOpen(false);
    resetTaskId();
  }, [resetTaskId, setIsOpen]);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return {
    isOpen,
    onOpen,
    onClose,
    taskId,
    setTaskId,
  };
};

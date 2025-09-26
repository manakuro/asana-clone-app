import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const isOpenAtom = atom<boolean>(false);

export const useTaskDetailProjectsInput = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return {
    isOpen,
    onOpen,
    onClose,
  };
};

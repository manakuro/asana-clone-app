import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const isOpenAtom = atom<boolean>(false);

export const useTaskDetailProjectsInput = () => {
  const [open, setIsOpen] = useAtom(isOpenAtom);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return {
    open,
    onOpen,
    onClose,
  };
};

import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const openAtom = atom(false);

export const useHelp = () => {
  const [isOpen, setIsOpen] = useAtom(openAtom);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return {
    isOpen,
    setIsOpen,
    onClose,
  };
};

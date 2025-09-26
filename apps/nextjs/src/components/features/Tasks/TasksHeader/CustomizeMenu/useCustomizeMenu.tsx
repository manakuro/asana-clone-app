import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const isOpenAtom = atom(false);

export const useCustomizeMenu = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return {
    isOpen,
    setIsOpen,
    onClose,
  };
};

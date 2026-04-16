import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const isOpenAtom = atom(false);

export const useCustomizeMenu = () => {
  const [open, setIsOpen] = useAtom(isOpenAtom);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return {
    open,
    setIsOpen,
    onClose,
  };
};

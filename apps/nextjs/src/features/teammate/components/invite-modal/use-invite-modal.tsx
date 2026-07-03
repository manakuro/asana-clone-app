import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const openAtom = atom(false);

export const useInviteModal = () => {
  const [open, setIsOpen] = useAtom(openAtom);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return {
    open,
    setIsOpen,
    onClose,
  };
};

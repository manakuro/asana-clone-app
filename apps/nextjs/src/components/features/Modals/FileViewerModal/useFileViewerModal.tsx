import { atom, useAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';
import { useCallback } from 'react';

const openAtom = atom(false);

type State = {
  currentTaskFileId: string;
  taskFileIds: string[];
};
const fileViewerAtom = atomWithReset<State>({
  currentTaskFileId: '',
  taskFileIds: [],
});

export const useFileViewerModal = () => {
  const [isOpen, setIsOpen] = useAtom(openAtom);
  const [state, setState] = useAtom(fileViewerAtom);
  const resetState = useResetAtom(fileViewerAtom);

  const onClose = useCallback(() => {
    setIsOpen(false);
    resetState();
  }, [resetState, setIsOpen]);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return {
    isOpen,
    onOpen,
    onClose,
    ...state,
    setState,
  };
};

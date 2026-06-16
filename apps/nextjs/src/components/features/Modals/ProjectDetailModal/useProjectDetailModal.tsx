import { atom, useAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';
import { useCallback } from 'react';

const state = atom(false);

const projectIdState = atomWithReset<string>('');

export const useProjectDetailModal = () => {
  const [open, setIsOpen] = useAtom(state);
  const [projectId, setProjectId] = useAtom(projectIdState);
  const resetProjectId = useResetAtom(projectIdState);

  const onClose = useCallback(() => {
    setIsOpen(false);
    resetProjectId();
  }, [setIsOpen, resetProjectId]);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return {
    open,
    onOpen,
    onClose,
    projectId,
    setProjectId,
  };
};

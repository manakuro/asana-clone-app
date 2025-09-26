import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const assigneeOpenAtom = atom<boolean>(false);

const assigneeAtom = atom<any | null>(null);

const assigneeSelectedIndexAtom = atom<number>(0);

export const useAssigneeMenu = () => {
  const [isOpen, setIsOpen] = useAtom(assigneeOpenAtom);
  const [assignee, setAssignee] = useAtom(assigneeAtom);
  const [selectedIndex, setSelectedIndex] = useAtom(assigneeSelectedIndexAtom);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return {
    isOpen,
    onOpen,
    onClose,
    setAssignee,
    assignee,
    selectedIndex,
    setSelectedIndex,
  };
};

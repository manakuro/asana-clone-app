import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const isExpandedAtom = atom(true);

export const useNavigation = () => {
  const [isExpanded, setIsExpanded] = useAtom(isExpandedAtom);

  const toggleMenu = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, [setIsExpanded]);

  return {
    isExpanded,
    toggleMenu,
  };
};

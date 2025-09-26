import { useCallback, useMemo, useState } from 'react';
import { useSubtasksNameContext } from '../Provider';

export type UseDueDate = {
  onDueDateOpened: () => void;
  onDueDateClosed: () => void;
  dueDateFocused: boolean;
  showIcon: boolean;
};
export const useDueDate = (): UseDueDate => {
  const { isHovering } = useSubtasksNameContext();
  const [focused, setFocused] = useState(false);

  const onDueDateOpened = useCallback(() => {
    setFocused(true);
  }, []);

  const onDueDateClosed = useCallback(() => {
    setFocused(false);
  }, []);

  const showIcon = useMemo(() => isHovering || focused, [isHovering, focused]);

  return {
    onDueDateOpened,
    onDueDateClosed,
    dueDateFocused: focused,
    showIcon,
  };
};

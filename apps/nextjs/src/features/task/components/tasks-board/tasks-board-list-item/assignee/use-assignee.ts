import { useCallback, useMemo, useState } from 'react';
import { useTasksBoardListItemContext } from '../provider';

export const useAssignee = () => {
  const { isHovering } = useTasksBoardListItemContext();
  const [focused, setFocused] = useState(false);

  const onAssigneeOpened = useCallback(() => {
    setFocused(true);
  }, []);

  const onAssigneeClosed = useCallback(() => {
    setFocused(false);
  }, []);

  const showIcon = useMemo(() => isHovering || focused, [isHovering, focused]);

  return {
    onAssigneeOpened,
    onAssigneeClosed,
    assigneeFocused: focused,
    showIcon,
  };
};

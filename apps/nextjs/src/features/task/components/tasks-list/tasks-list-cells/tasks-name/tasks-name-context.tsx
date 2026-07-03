import { useCallback, useMemo, useState } from 'react';
import { useHover } from '@/hooks/use-hover';
import { createContext } from '@/lib/react/create-context';
import { useInputFocus } from './use-input-focus';
import { useMarkMenuFocus } from './use-mark-menu-focus';

type Props = {
  taskId: string;
};
const useValue = (props: Props) => {
  const useInputFocusResult = useInputFocus();
  const { markMenuFocused, onMarkMenuClosed, onMarkMenuOpened } =
    useMarkMenuFocus();
  const { ref, isHovering } = useHover<HTMLDivElement>();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const onStartTransition = useCallback(() => {
    setIsTransitioning(true);
  }, []);

  const onEndTransition = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  const showIcon = useMemo(
    () => isHovering || markMenuFocused,
    [isHovering, markMenuFocused],
  );

  const showMark = useMemo(
    () => isHovering || markMenuFocused,
    [isHovering, markMenuFocused],
  );

  return {
    ...useInputFocusResult,
    markMenuFocused,
    onMarkMenuClosed,
    onMarkMenuOpened,
    ref,
    isHovering,
    showIcon,
    showMark,
    taskId: props.taskId,
    isTransitioning,
    onStartTransition,
    onEndTransition,
  };
};
export const { Context: TasksNameContext, useContext: useTasksNameContext } =
  createContext(
    useValue,
    '@/components/features/tasks/tasks-list/tasks-list-cells/tasks-name/tasks-name-context.tsx',
  );

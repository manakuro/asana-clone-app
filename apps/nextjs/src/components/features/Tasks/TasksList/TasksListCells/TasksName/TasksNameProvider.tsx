import { useCallback, useMemo, useState } from 'react';
import { useHover } from '@/hooks/useHover';
import { createProvider } from '@/shared/react/createProvider';
import { useInputFocus } from './useInputFocus';
import { useMarkMenuFocus } from './useMarkMenuFocus';

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
export const { Provider: TasksNameProvider, useContext: useTasksNameContext } =
  createProvider(
    useValue,
    '@/components/organisms/Tasks/TasksList/TasksListCells/TasksName/TasksNameProvider.tsx',
  );

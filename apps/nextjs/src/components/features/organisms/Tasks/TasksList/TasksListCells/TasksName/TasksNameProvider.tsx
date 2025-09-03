import { useHover } from '@/hooks/useHover';
import { createProvider } from '@/shared/react/createProvider';
import type React from 'react';
import { useCallback, useMemo, useState } from 'react';
import { type UseInputFocus, useInputFocus } from './useInputFocus';
import { type UseMarkMenuFocus, useMarkMenuFocus } from './useMarkMenuFocus';

type ContextProps = UseInputFocus &
  UseMarkMenuFocus & {
    ref: React.MutableRefObject<HTMLElement | null>;
    isHovering: boolean;
    showIcon: boolean;
    showMark: boolean;
    taskId: string;
    isTransitioning: boolean;
    onStartTransition: () => void;
    onEndTransition: () => void;
  };

type Props = {
  taskId: string;
};
const useValue = (props: Props): ContextProps => {
  const useInputFocusResult = useInputFocus();
  const { markMenuFocused, onMarkMenuClosed, onMarkMenuOpened } =
    useMarkMenuFocus();
  const { ref, isHovering } = useHover();
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

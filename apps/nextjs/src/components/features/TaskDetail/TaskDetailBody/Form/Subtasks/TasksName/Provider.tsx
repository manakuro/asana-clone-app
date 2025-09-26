import { useHover } from '@/hooks/useHover';
import { createProvider } from '@/shared/react/createProvider';
import type React from 'react';
import { useCallback, useMemo, useState } from 'react';
import { type UseInputFocus, useInputFocus } from './useInputFocus';

type ContextProps = UseInputFocus & {
  ref: React.MutableRefObject<HTMLElement | null>;
  isHovering: boolean;
  showIcon: boolean;
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
  const { ref, isHovering } = useHover();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const showIcon = useMemo(() => isHovering, [isHovering]);

  const onStartTransition = useCallback(() => {
    setIsTransitioning(true);
  }, []);

  const onEndTransition = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return {
    ...useInputFocusResult,
    ref,
    isHovering,
    showIcon,
    taskId: props.taskId,
    isTransitioning,
    onStartTransition,
    onEndTransition,
  };
};
export const { Provider, useContext: useSubtasksNameContext } = createProvider(
  useValue,
  '@/components/organisms/TaskDetail/TaskDetailBody/Form/Subtasks/TasksName/Provider.tsx',
);

import { useCallback, useMemo, useState } from 'react';
import { useHover } from '@/hooks/useHover';
import { createProvider } from '@/shared/react/createProvider';
import { useInputFocus } from './useInputFocus';

type Props = {
  taskId: string;
};
const useValue = (props: Props) => {
  const useInputFocusResult = useInputFocus();
  const { ref, isHovering } = useHover<HTMLDivElement>();
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

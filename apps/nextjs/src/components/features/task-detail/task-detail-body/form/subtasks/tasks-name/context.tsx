import { useCallback, useMemo, useState } from 'react';
import { useHover } from '@/hooks/use-hover';
import { createContext } from '@/shared/react/create-context';
import { useInputFocus } from './use-input-focus';

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
export const { Context, useContext: useSubtasksNameContext } = createContext(
  useValue,
  '@/components/features/task-detail/task-detail-body/form/subtasks/tasks-name/context.tsx',
);

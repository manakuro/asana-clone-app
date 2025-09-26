import { useHover } from '@/hooks/useHover';
import { createProvider } from '@/shared/react/createProvider';
import type React from 'react';

type ContextProps = {
  ref: React.MutableRefObject<HTMLElement | null>;
  isHovering: boolean;
  taskId: string;
};

type Props = {
  taskId: string;
};
const useValue = (props: Props): ContextProps => {
  const { ref, isHovering } = useHover();

  return {
    ref,
    isHovering,
    taskId: props.taskId,
  };
};
export const { Provider: TasksNameProvider, useContext: useTasksNameContext } =
  createProvider(
    useValue,
    '@/components/organisms/Tasks/TasksBoard/TasksBoardListItem/TasksName/Provider.tsx',
  );

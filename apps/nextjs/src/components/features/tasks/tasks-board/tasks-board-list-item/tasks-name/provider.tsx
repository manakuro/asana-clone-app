import type React from 'react';
import { useHover } from '@/hooks/use-hover';
import { createContext } from '@/shared/react/create-context';

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
export const { Context: TasksNameContext, useContext: useTasksNameContext } =
  createContext(
    useValue,
    '@/components/features/tasks/tasks-board/tasks-board-list-item/tasks-name/context.tsx',
  );

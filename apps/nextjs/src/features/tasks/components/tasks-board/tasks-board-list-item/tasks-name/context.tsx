import { useHover } from '@/hooks/use-hover';
import { createContext } from '@/lib/react/create-context';

type Props = {
  taskId: string;
};
const useValue = (props: Props) => {
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

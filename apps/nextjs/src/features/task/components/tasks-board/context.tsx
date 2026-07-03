import { createContext } from '@/lib/react/create-context';

const useValue = () => {
  return {};
};
export const { Context, useContext: useTasksBoardContext } = createContext(
  useValue,
  '@/components/features/tasks/tasks-board/context.tsx',
);

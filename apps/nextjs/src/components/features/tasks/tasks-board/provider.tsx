import { createContext } from '@/shared/react/create-context';

const useValue = () => {
  return {};
};
export const { Context, useContext: useTasksBoardContext } = createContext(
  useValue,
  '@/components/features/tasks/tasks-board/context.tsx',
);

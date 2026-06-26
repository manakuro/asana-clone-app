import { createContext } from '@/shared/react/create-context';

const useValue = () => {
  return {};
};
export const { Context, useContext: useTasksFilesContext } = createContext(
  useValue,
  '@/components/features/tasks/tasks-files/context.tsx',
);

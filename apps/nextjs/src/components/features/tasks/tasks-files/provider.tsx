import { createProvider } from '@/shared/react/create-provider';

const useValue = () => {
  return {};
};
export const { Provider, useContext: useTasksFilesContext } = createProvider(
  useValue,
  '@/components/organisms/Tasks/TasksFiles/Provider.tsx',
);

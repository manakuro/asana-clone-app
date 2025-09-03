import { createProvider } from '@/shared/react/createProvider';

const useValue = () => {
  return {};
};
export const { Provider, useContext: useTasksFilesContext } = createProvider(
  useValue,
  '@/components/organisms/Tasks/TasksFiles/Provider.tsx',
);

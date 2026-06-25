import { createProvider } from '@/shared/react/create-provider';

const useValue = () => {
  return {};
};
export const { Provider, useContext: useTasksBoardContext } = createProvider(
  useValue,
  '@/components/organisms/Tasks/TasksBoard/Provider.tsx',
);

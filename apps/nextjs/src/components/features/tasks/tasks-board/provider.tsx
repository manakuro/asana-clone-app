import { createProvider } from '@/shared/react/createProvider';

const useValue = () => {
  return {};
};
export const { Provider, useContext: useTasksBoardContext } = createProvider(
  useValue,
  '@/components/organisms/Tasks/TasksBoard/Provider.tsx',
);

import { createProvider } from '@/shared/react/createProvider';

type ContextProps = {
  isMyTasksPage: boolean;
  isProjectsPage: boolean;
  isHomePage: boolean;
  isInboxPage: boolean;
};

type Props = {
  isMyTasksPage?: boolean;
  isProjectsPage?: boolean;
  isHomePage?: boolean;
  isInboxPage?: boolean;
};
export type TasksProviderProps = Props;

const useValue = (props: Props): ContextProps => {
  return {
    isMyTasksPage: !!props.isMyTasksPage,
    isProjectsPage: !!props.isProjectsPage,
    isHomePage: !!props.isHomePage,
    isInboxPage: !!props.isInboxPage,
  } as const;
};
export const { Provider: TasksProvider, useContext: useTasksContext } =
  createProvider(useValue, 'TasksProvider');

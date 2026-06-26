import { createContext } from '@/shared/react/create-context';

type ContextProps = {
  projectId: string;
};

type Props = {
  projectId: string;
};

const useValue = (props: Props): ContextProps => {
  return {
    projectId: props.projectId,
  } as const;
};
export const { Context, useContext: useTasksListSectionGroupByProjectContext } =
  createContext(
    useValue,
    '@/components/features/tasks/tasks-list/tasks-list-section-group-by-project/context.tsx',
  );

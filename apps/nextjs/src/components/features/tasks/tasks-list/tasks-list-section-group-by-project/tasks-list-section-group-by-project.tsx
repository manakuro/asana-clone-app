import { memo, useCallback, useState } from 'react';
import { TasksListItem } from '@/components/features/tasks/tasks-list/tasks-list-item';
import { TasksListSectionProvider } from '@/components/features/tasks/tasks-list/tasks-list-section';
import { Flex } from '@/components/ui/flex';
import { useMyTasksTaskIdsByProjectId } from '@/store/app/my-tasks/tasks';
import { Header } from './header';
import { Provider } from './provider';

type Props = {
  projectId: string;
};
export const TasksListSectionGroupByProject = memo(
  function TasksListSectionGroupByProject(props: Props) {
    return (
      <Provider projectId={props.projectId}>
        <Component {...props} />
      </Provider>
    );
  },
);

const Component = memo(function Component(props: Props) {
  const { taskIds } = useMyTasksTaskIdsByProjectId(props.projectId);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = useCallback(() => {
    setIsExpanded((s) => !s);
  }, []);

  return (
    <Flex flex={1} flexDirection="column">
      <Header
        projectId={props.projectId}
        onToggle={handleToggle}
        isExpanded={isExpanded}
      />
      {isExpanded && (
        <Flex flexDirection="column">
          {taskIds.map((id) => (
            <TasksListSectionProvider taskSectionId="" key={id}>
              <TasksListItem taskId={id} />
            </TasksListSectionProvider>
          ))}
        </Flex>
      )}
    </Flex>
  );
});

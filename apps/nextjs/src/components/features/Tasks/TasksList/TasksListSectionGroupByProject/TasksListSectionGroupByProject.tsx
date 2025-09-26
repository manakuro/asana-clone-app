import { TasksListItem } from '@/components/features/Tasks/TasksList/TasksListItem';
import { TasksListSectionProvider } from '@/components/features/Tasks/TasksList/TasksListSection';
import { Flex } from '@/components/ui/Flex';
import { useMyTasksTaskIdsByProjectId } from '@/store/app/myTasks/tasks';
import { memo, useCallback, useState } from 'react';
import { Header } from './Header';
import { Provider } from './Provider';

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
    <>
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
    </>
  );
});

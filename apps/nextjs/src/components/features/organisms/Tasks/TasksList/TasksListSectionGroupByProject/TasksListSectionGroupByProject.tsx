import { TasksListItem } from '@/components/features/organisms/Tasks/TasksList/TasksListItem';
import { TasksListSectionProvider } from '@/components/features/organisms/Tasks/TasksList/TasksListSection';
import { Flex } from '@/components/ui/atoms';
import { useMyTasksTaskIdsByProjectId } from '@/store/app/myTasks/tasks';
import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { Header } from './Header';
import { Provider } from './Provider';

type Props = {
  projectId: string;
};
export const TasksListSectionGroupByProject: React.FC<Props> = memo<Props>(
  (props) => {
    return (
      <Provider projectId={props.projectId}>
        <Component {...props} />
      </Provider>
    );
  },
);

const Component: React.FC<Props> = memo<Props>((props) => {
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

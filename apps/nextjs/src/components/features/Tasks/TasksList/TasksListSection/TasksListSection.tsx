import { TasksListItem } from '@/components/features/Tasks/TasksList/TasksListItem';
import { useTasksTaskIdsByTaskSectionId } from '@/components/features/Tasks/hooks';
import { Flex } from '@/components/ui/Flex';
import { memo, useCallback, useState } from 'react';
import { AddTask } from './AddTask';
import { AddTaskSection } from './AddTaskSection';
import { Header } from './Header';
import { Provider } from './Provider';

type Props = {
  taskSectionId: string;
  showAddButton: boolean;
  indented?: boolean;
};
export const TasksListSection = memo(function TasksListSection(props: Props) {
  return (
    <Provider taskSectionId={props.taskSectionId} indented={props.indented}>
      <Component {...props} />
    </Provider>
  );
});

const Component = memo(function Component(props: Props) {
  const { taskIds } = useTasksTaskIdsByTaskSectionId(props.taskSectionId);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = useCallback(() => {
    setIsExpanded((s) => !s);
  }, []);

  return (
    <>
      <Flex flexDirection="column">
        <Header
          taskSectionId={props.taskSectionId}
          onToggle={handleToggle}
          isExpanded={isExpanded}
        />
        {isExpanded && (
          <Flex flexDirection="column">
            {taskIds.map((id) => (
              <TasksListItem taskId={id} key={id} />
            ))}
            <AddTask taskSectionId={props.taskSectionId} />
          </Flex>
        )}
      </Flex>
      {props.showAddButton && <AddTaskSection />}
    </>
  );
});

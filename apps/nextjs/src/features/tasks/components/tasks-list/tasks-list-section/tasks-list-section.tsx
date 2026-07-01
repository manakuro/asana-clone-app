import { memo, useCallback, useState } from 'react';
import { Flex } from '@/components/ui/flex';
import { TasksListItem } from '@/features/tasks/components/tasks-list/tasks-list-item';
import { useTasksTaskIdsByTaskSectionId } from '@/features/tasks/hooks';
import { AddTask } from './add-task';
import { AddTaskSection } from './add-task-section';
import { Context } from './context';
import { Header } from './header';

type Props = {
  taskSectionId: string;
  showAddButton: boolean;
  indented?: boolean;
};
export const TasksListSection = memo(function TasksListSection(props: Props) {
  return (
    <Context taskSectionId={props.taskSectionId} indented={props.indented}>
      <Component {...props} />
    </Context>
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

import { memo, useCallback, useState } from 'react';
import { TasksListItem } from '@/components/features/tasks/components/tasks-list/tasks-list-item';
import { TasksListSectionContext } from '@/components/features/tasks/components/tasks-list/tasks-list-section';
import { Flex } from '@/components/ui/flex';
import { useMyTasksTaskIdsByProjectId } from '@/store/app/my-tasks/tasks';
import { Context } from './context';
import { Header } from './header';

type Props = {
  projectId: string;
};
export const TasksListSectionGroupByProject = memo(
  function TasksListSectionGroupByProject(props: Props) {
    return (
      <Context projectId={props.projectId}>
        <Component {...props} />
      </Context>
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
            <TasksListSectionContext taskSectionId="" key={id}>
              <TasksListItem taskId={id} />
            </TasksListSectionContext>
          ))}
        </Flex>
      )}
    </Flex>
  );
});

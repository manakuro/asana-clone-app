import { Flex, type FlexProps } from '@/components/ui/Flex';
import { Stack } from '@/components/ui/Stack';
import { useProjectIdsByTaskId } from '@/store/entities/projectTask';
import { memo } from 'react';
import { Card } from './Card';
import { DueDate } from './DueDate';
import { Feed } from './Feed';
import { Like } from './Like';
import { MoreAction } from './MoreAction';
import { Projects } from './Projects';
import { Subtask } from './Subtask';
import { TasksName } from './TasksName';
import { useTasksBoardListItemElement } from './useTasksBoardListItemElement';

type Props = FlexProps & {
  taskId: string;
};

export const TasksBoardListItemForMyTasksPage = memo<Props>(
  function TasksBoardListItemForMyTasksPage(props) {
    const { className, generateId } = useTasksBoardListItemElement();
    const { projectIds } = useProjectIdsByTaskId(props.taskId);

    return (
      <Card
        taskId={props.taskId}
        className={className}
        id={generateId(props.taskId)}
      >
        {/*cover image here*/}
        <Projects projectIds={projectIds} />
        <TasksName taskId={props.taskId} />
        <Flex mt={4} alignItems="center">
          <Stack spacing={1} direction="row">
            <DueDate taskId={props.taskId} />
          </Stack>
          <Flex ml="auto">
            <Like taskId={props.taskId} />
            <Feed taskId={props.taskId} />
            <Subtask taskId={props.taskId} />
          </Flex>
        </Flex>
        <MoreAction taskId={props.taskId} />
      </Card>
    );
  },
);

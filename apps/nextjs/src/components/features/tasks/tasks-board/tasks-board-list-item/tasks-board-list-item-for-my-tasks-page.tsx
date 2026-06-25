import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { useProjectIdsByTaskId } from '@/store/entities/project-task';
import { Card } from './card';
import { DueDate } from './due-date';
import { Feed } from './feed';
import { Like } from './like';
import { MoreAction } from './more-action';
import { Projects } from './projects';
import { Subtask } from './subtask';
import { TasksName } from './tasks-name';
import { useTasksBoardListItemElement } from './use-tasks-board-list-item-element';

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
          <Stack gap={1} direction="row">
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

import { Flex, type FlexProps } from '@/components/ui/Flex';
import { Stack } from '@/components/ui/Stack';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { useProjectIdsByTaskId } from '@/store/entities/projectTask';
import type React from 'react';
import { memo } from 'react';
import { Assignee } from './Assignee';
import { Card } from './Card';
import { DueDate } from './DueDate';
import { Feed } from './Feed';
import { Like } from './Like';
import { MoreAction } from './MoreAction';
import { Priority } from './Priority';
import { Projects } from './Projects';
import { Subtask } from './Subtask';
import { Tags } from './Tags';
import { TasksName } from './TasksName';
import { useTasksBoardListItemElement } from './useTasksBoardListItemElement';

type Props = FlexProps & {
  taskId: string;
};

export const TasksBoardListItemForProjectsPage: React.FC<Props> = memo<Props>(
  (props) => {
    const { className, generateId } = useTasksBoardListItemElement();
    const { projectId } = useProjectsProjectId();
    const { projectIds } = useProjectIdsByTaskId(props.taskId, {
      excluded: [projectId],
    });

    return (
      <Card
        taskId={props.taskId}
        className={className}
        id={generateId(props.taskId)}
      >
        {/*cover image here*/}
        <Projects projectIds={projectIds} />
        <TasksName taskId={props.taskId} />
        <Stack spacing={2} direction="row" mt={4} alignItems="center">
          <Priority taskId={props.taskId} />
          <Tags taskId={props.taskId} />
        </Stack>
        <Flex mt={4} alignItems="center">
          <Stack spacing={2} direction="row">
            <Assignee taskId={props.taskId} />
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
TasksBoardListItemForProjectsPage.displayName =
  'TasksBoardListItemForProjectsPage';

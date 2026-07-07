import type React from 'react';
import { memo } from 'react';
import { useProjectsProjectId } from '@/components/pages/projects/store/projects/project';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { useProjectIdsByTaskId } from '@/store/entities/project-task';
import { Assignee } from './assignee';
import { Card } from './card';
import { DueDate } from './due-date';
import { Feed } from './feed';
import { Like } from './like';
import { MoreAction } from './more-action';
import { Priority } from './priority';
import { Projects } from './projects';
import { Subtask } from './subtask';
import { Tags } from './tags';
import { TasksName } from './tasks-name';
import { useTasksBoardListItemElement } from './use-tasks-board-list-item-element';

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
        <Stack gap={2} direction="row" mt={4} alignItems="center">
          <Priority taskId={props.taskId} />
          <Tags taskId={props.taskId} />
        </Stack>
        <Flex mt={4} alignItems="center">
          <Stack gap={2} direction="row">
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

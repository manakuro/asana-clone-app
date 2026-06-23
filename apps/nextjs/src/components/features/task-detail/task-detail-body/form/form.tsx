import { memo } from 'react';
import { useTaskDetail } from '@/components/features/task-detail';
import { Flex } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { Assignee } from './assignee';
import { Attachment } from './attachment';
import { Description } from './description';
import { DueDate } from './due-date';
import { FeedList } from './feed-list';
import { ParentTask } from './parent-task';
import { Projects } from './projects';
import { Subtasks } from './subtasks';
import { TaskName } from './task-name';

export const Form = memo(function Form() {
  const { taskId } = useTaskDetail();

  return (
    <Flex flexDirection="column" pt={2} flex={1}>
      <ParentTask taskId={taskId} />
      <TaskName taskId={taskId} />
      <Stack px={6} mt={3}>
        <Assignee taskId={taskId} />
        <DueDate taskId={taskId} />
        <Projects taskId={taskId} />
        <Description taskId={taskId} />
        <Subtasks taskParentId={taskId} />
        <Attachment taskId={taskId} />
      </Stack>
      <FeedList taskId={taskId} />
    </Flex>
  );
});

import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { AddTaskButton } from './add-task-button';
import { MoreAction } from './more-action';
import { TaskSectionName } from './task-section-name';

type Props = {
  taskSectionId: string;
};

export const Header = memo(function Header(props: Props) {
  return (
    <Flex h="36px" alignItems="center">
      <TaskSectionName taskSectionId={props.taskSectionId} />
      <Stack direction="row" gap={1} ml="auto">
        <AddTaskButton taskSectionId={props.taskSectionId} />
        <MoreAction />
      </Stack>
    </Flex>
  );
});

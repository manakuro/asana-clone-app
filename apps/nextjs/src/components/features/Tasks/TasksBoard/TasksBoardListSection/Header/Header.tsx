import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { AddTaskButton } from './AddTaskButton';
import { MoreAction } from './MoreAction';
import { TaskSectionName } from './TaskSectionName';

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

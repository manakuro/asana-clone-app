import { Flex, Stack } from '@/components/ui/atoms';
import { memo } from 'react';
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
      <Stack direction="row" spacing={1} ml="auto">
        <AddTaskButton taskSectionId={props.taskSectionId} />
        <MoreAction />
      </Stack>
    </Flex>
  );
});

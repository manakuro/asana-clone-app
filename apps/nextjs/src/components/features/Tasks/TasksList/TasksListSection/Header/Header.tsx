import { memo } from 'react';
import { useTasksListContext } from '@/components/features/Tasks/TasksList/Provider';
import { useTasksListSectionContext } from '@/components/features/Tasks/TasksList/TasksListSection/Provider';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Stack } from '@/components/ui/stack';
import { useHover } from '@/hooks/useHover';
import { AddTaskButton } from './AddTaskButton';
import { MoreAction } from './MoreAction';
import { TaskSectionName } from './TaskSectionName';

type Props = {
  taskSectionId: string;
  onToggle: () => void;
  isExpanded: boolean;
};

export const Header = memo(function Header(props: Props) {
  const { onToggle, isExpanded } = props;
  const { ref, isHovering } = useHover<HTMLDivElement>();
  const { indentedStyle } = useTasksListSectionContext();
  const { stickyStyle } = useTasksListContext();

  return (
    <Flex
      h="50px"
      maxW="60%"
      alignItems="center"
      ref={ref}
      px={6}
      {...indentedStyle}
      css={stickyStyle}
      zIndex={(stickyStyle.zIndex as number) + 1}
    >
      <IconButton
        aria-label="Task list expand button"
        variant="ghost"
        onClick={onToggle}
      >
        <Icon icon={isExpanded ? 'chevronDown' : 'chevronRight'} />
      </IconButton>
      <TaskSectionName taskSectionId={props.taskSectionId} />
      {isHovering && (
        <Stack direction="row" gap={1}>
          <AddTaskButton taskSectionId={props.taskSectionId} />
          <MoreAction />
        </Stack>
      )}
    </Flex>
  );
});

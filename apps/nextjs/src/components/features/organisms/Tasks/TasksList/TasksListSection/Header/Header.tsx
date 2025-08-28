import { useTasksListContext } from '@/components/features/organisms/Tasks/TasksList/Provider';
import { useTasksListSectionContext } from '@/components/features/organisms/Tasks/TasksList/TasksListSection/Provider';
import { Flex, Icon, IconButton, Stack } from '@/components/ui/atoms';
import { useHover } from '@/hooks/useHover';
import { memo } from 'react';
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
  const { ref, isHovering } = useHover();
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
      {...stickyStyle}
      zIndex={(stickyStyle.zIndex as number) + 1}
    >
      <IconButton
        aria-label="Task list expand button"
        icon={<Icon icon={isExpanded ? 'chevronDown' : 'chevronRight'} />}
        variant="ghost"
        onClick={onToggle}
      />
      <TaskSectionName taskSectionId={props.taskSectionId} />
      {isHovering && (
        <Stack direction="row" spacing={1}>
          <AddTaskButton taskSectionId={props.taskSectionId} />
          <MoreAction />
        </Stack>
      )}
    </Flex>
  );
});

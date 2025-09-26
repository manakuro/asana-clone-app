import { useTasksListContext } from '@/components/features/Tasks/TasksList/Provider';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { memo } from 'react';
import { TaskSectionName } from './TaskSectionName';

type Props = {
  projectId: string;
  onToggle: () => void;
  isExpanded: boolean;
};

export const Header = memo(function Header(props: Props) {
  const { onToggle, isExpanded } = props;
  const { stickyStyle } = useTasksListContext();

  return (
    <Flex
      h="50px"
      maxW="40%"
      alignItems="center"
      pl={6}
      {...stickyStyle}
      zIndex={(stickyStyle.zIndex as number) + 1}
      mt={1}
    >
      <IconButton
        aria-label="Task list expand button"
        icon={<Icon icon={isExpanded ? 'chevronDown' : 'chevronRight'} />}
        variant="ghost"
        onClick={onToggle}
      />
      <TaskSectionName projectId={props.projectId} />
    </Flex>
  );
});

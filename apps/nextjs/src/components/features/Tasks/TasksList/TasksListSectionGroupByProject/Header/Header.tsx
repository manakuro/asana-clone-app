import { memo } from 'react';
import { useTasksListContext } from '@/components/features/Tasks/TasksList/Provider';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
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
      css={stickyStyle}
      zIndex={(stickyStyle.zIndex as number) + 1}
      mt={1}
    >
      <IconButton
        aria-label="Task list expand button"
        variant="ghost"
        onClick={onToggle}
      >
        <Icon icon={isExpanded ? 'chevronDown' : 'chevronRight'} />
      </IconButton>
      <TaskSectionName projectId={props.projectId} />
    </Flex>
  );
});

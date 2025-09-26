import { useSubtaskListContext } from '@/components/features/Tasks/TasksList/TasksListItem/Provider';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import type React from 'react';
import { memo, useCallback } from 'react';

type Props = {
  showExpandIcon: boolean;
};
export const Component = memo(function Component(props: Props) {
  const { isSubtaskExpanded, onToggleExpandSubtask } = useSubtaskListContext();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onToggleExpandSubtask();
    },
    [onToggleExpandSubtask],
  );

  return (
    <IconButton
      onClick={handleClick}
      aria-label="Show sub task"
      icon={
        <Icon
          icon={isSubtaskExpanded ? 'chevronDown' : 'chevronRight'}
          color="text.muted"
          size="sm"
        />
      }
      visibility={props.showExpandIcon ? 'visible' : 'hidden'}
      size="xs"
      h={5}
      minW={5}
      p={0}
      variant="ghost"
    />
  );
});

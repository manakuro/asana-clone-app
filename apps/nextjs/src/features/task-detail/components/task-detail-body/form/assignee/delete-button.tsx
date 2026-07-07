import type React from 'react';
import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/icon';
import { useTaskCommand } from '@/features/task/store/task';
import { useClickableHoverStyle } from '@/hooks/styles/use-clickable-hover-style';

type Props = {
  taskId: string;
  isHovering: boolean;
};

export const DeleteButton = memo(function DeleteButton(props: Props) {
  const { isHovering, taskId } = props;
  const { unassignTask } = useTaskCommand();
  const { clickableHoverLightStyle } = useClickableHoverStyle();

  const handleClick = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      await unassignTask({ id: taskId });
    },
    [taskId, unassignTask],
  );

  return (
    <Icon
      ml={2}
      mt="1px"
      icon="x"
      color="fg.muted"
      size="sm"
      visibility={isHovering ? 'visible' : 'hidden'}
      {...clickableHoverLightStyle}
      onClick={handleClick}
    />
  );
});

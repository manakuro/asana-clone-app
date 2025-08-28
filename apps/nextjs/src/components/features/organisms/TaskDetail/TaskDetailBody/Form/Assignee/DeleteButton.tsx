import { Icon } from '@/components/ui/atoms';
import { useClickableHoverStyle } from '@/hooks';
import { useTaskCommand } from '@/store/entities/task';
import type React from 'react';
import { memo, useCallback } from 'react';

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
      color="text.muted"
      size="sm"
      visibility={isHovering ? 'visible' : 'hidden'}
      {...clickableHoverLightStyle}
      onClick={handleClick}
    />
  );
});

import type React from 'react';
import { memo, useCallback } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { useClickableHoverStyle } from '@/hooks/styles/use-clickable-hover-style';
import { useTaskCommand } from '@/store/entities/task';

type Props = FlexProps & {
  taskId: string;
};

export const DeleteButton = memo(function DeleteButton(props: Props) {
  const { unassignTask } = useTaskCommand();
  const { clickableHoverLightStyle } = useClickableHoverStyle();
  const handleClick = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      await unassignTask({ id: props.taskId });
    },
    [props.taskId, unassignTask],
  );

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      h="90%"
      w={6}
      ml="auto"
      bg="gray.50"
      position="absolute"
      right="1px"
    >
      <Icon
        mt="1px"
        icon="x"
        color="fg.muted"
        size="sm"
        {...clickableHoverLightStyle}
        onClick={handleClick}
      />
    </Flex>
  );
});

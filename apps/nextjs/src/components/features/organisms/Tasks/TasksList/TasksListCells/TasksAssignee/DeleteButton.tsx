import { Flex, type FlexProps, Icon } from '@/components/ui/atoms';
import { useClickableHoverStyle } from '@/hooks';
import { useTaskCommand } from '@/store/entities/task';
import type React from 'react';
import { memo, useCallback } from 'react';

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
        color="text.muted"
        size="sm"
        {...clickableHoverLightStyle}
        onClick={handleClick}
      />
    </Flex>
  );
});

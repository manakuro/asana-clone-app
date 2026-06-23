import type React from 'react';
import { memo, useCallback } from 'react';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Icon, type IconProps } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useClickableHoverStyle } from '@/hooks';
import { useTaskTag } from '@/store/entities/taskTag';

type Variant = 'button' | 'icon';

type Props = {
  taskTagId: string;
  variant: Variant;
  onDelete?: (id: string) => void;
  deletable?: boolean;
  iconProps?: Omit<IconProps, 'icon'>;
};

export const TagChip = memo(function TagChip(props: Props) {
  const { taskTagId, variant, iconProps, onDelete } = props;
  const { taskTag } = useTaskTag(taskTagId);
  const { clickableHoverLightStyle } = useClickableHoverStyle();

  const handleDelete = useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      onDelete?.(taskTagId);
    },
    [onDelete, taskTagId],
  );

  if (variant === 'icon') {
    return (
      <Icon
        icon="tag"
        color={taskTag.tag.color.color}
        size="sm"
        {...iconProps}
      />
    );
  }

  return (
    <Button
      as={Box}
      size="xs"
      border="1px"
      borderColor="transparent"
      cursor="pointer"
      borderRadius="full"
      minH={5}
      h={5}
      bg={taskTag.tag.color.color}
      _hover={{
        bg: taskTag.tag.color.color,
      }}
    >
      <Text fontSize="xs" lineClamp={1} color="fg">
        {taskTag.tag.name}
      </Text>
      {props.deletable && (
        <Icon
          ml={1}
          mt="1px"
          icon="x"
          color="fg.muted"
          size="sm"
          {...clickableHoverLightStyle}
          onClick={handleDelete}
        />
      )}
    </Button>
  );
});

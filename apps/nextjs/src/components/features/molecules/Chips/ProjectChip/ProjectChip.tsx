import {
  Badge,
  type BadgeProps,
  Box,
  Button,
  ColorBox,
  Icon,
  Text,
} from '@/components/ui/atoms';
import { useClickableHoverStyle } from '@/hooks';
import { useProject } from '@/store/entities/project';
import { useProjectBaseColor } from '@/store/entities/projectBaseColor';
import type React from 'react';
import { memo, useCallback } from 'react';

type Variant = 'badge' | 'button';

type Props = {
  projectId: string;
  variant: Variant;
  onDelete?: () => void;
  deletable?: boolean;
  onClick?: () => void;
  badgeProps?: BadgeProps;
};

export const ProjectChip = memo(function ProjectChip(props: Props) {
  const { projectId, onClick, onDelete } = props;
  const { project } = useProject(projectId);
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId);
  const { clickableHoverLightStyle } = useClickableHoverStyle();

  const handleDelete = useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      onDelete?.();
    },
    [onDelete],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      onClick?.();
    },
    [onClick],
  );

  if (props.variant === 'badge') {
    return (
      <Badge
        variant="solid"
        bg={projectBaseColor.color.color}
        textAlign="center"
        onClick={handleClick}
        {...props.badgeProps}
      >
        {project.name}
      </Badge>
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
      _hover={{ bg: 'gray.100' }}
    >
      <ColorBox size="xs" color={projectBaseColor.color.color} />
      <Text ml={2} fontSize="xs" noOfLines={1} color="text.base">
        {project.name}
      </Text>
      {props.deletable && (
        <Icon
          ml={1}
          mt="1px"
          icon="x"
          color="text.muted"
          size="sm"
          {...clickableHoverLightStyle}
          onClick={handleDelete}
        />
      )}
    </Button>
  );
});

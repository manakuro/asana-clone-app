import type React from 'react';
import { memo, useCallback } from 'react';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ColorBox } from '@/components/ui/color-box';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useProject } from '@/features/project/store/project';
import { useProjectBaseColor } from '@/features/project/store/project-base-color';
import { useClickableHoverStyle } from '@/hooks/styles/use-clickable-hover-style';

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
      size="xs"
      border="1px"
      borderColor="transparent"
      cursor="pointer"
      borderRadius="full"
      minH={5}
      h={5}
      _hover={{ bg: 'gray.100' }}
      variant="subtle"
    >
      <ColorBox size="xs" color={projectBaseColor.color.color} />
      <Text ml={2} fontSize="xs" lineClamp={1} color="fg">
        {project.name}
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

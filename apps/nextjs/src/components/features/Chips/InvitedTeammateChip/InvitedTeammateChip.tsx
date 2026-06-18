import type React from 'react';
import { memo, useCallback } from 'react';
import { TeammateAvatar } from '@/components/features/TeammateAvatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useClickableHoverStyle } from '@/hooks';
import type { Teammate } from '@/store/entities/teammate';

type Variant = 'badge' | 'button';

type Props = {
  teammate: Teammate;
  variant: Variant;
  onDelete?: (teammateId: string) => void;
  deletable?: boolean;
  onClick?: () => void;
};

export const InvitedTeammateChip = memo(function InvitedTeammateChip(
  props: Props,
) {
  const { teammate, onClick } = props;
  const { clickableHoverLightStyle } = useClickableHoverStyle();

  const handleDelete = useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      props.onDelete?.(teammate.id);
    },
    [props, teammate.id],
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
      <Badge variant="solid" textAlign="center" onClick={handleClick}>
        {teammate.name}
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
      minH={6}
      h={6}
      variant="subtle"
    >
      <TeammateAvatar teammateId={teammate.id} w={6} h={6} />
      <Text ml={2} fontSize="xs" lineClamp={1}>
        {teammate.name}
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

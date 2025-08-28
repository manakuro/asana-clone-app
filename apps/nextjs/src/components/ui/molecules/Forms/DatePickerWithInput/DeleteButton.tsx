import { Icon } from '@/components/ui/atoms';
import { useClickableHoverStyle } from '@/hooks';
import type React from 'react';
import { memo, useCallback } from 'react';

type Props = {
  onDelete: () => void;
  isHovering: boolean;
};

export const DeleteButton = memo(function DeleteButton(props: Props) {
  const { isHovering, onDelete } = props;
  const { clickableHoverLightStyle } = useClickableHoverStyle();

  const handleClick = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      onDelete();
    },
    [onDelete],
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

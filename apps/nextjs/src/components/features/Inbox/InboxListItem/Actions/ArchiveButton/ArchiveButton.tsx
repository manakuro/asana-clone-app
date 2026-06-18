import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/icon';
import { IconButton, type IconButtonProps } from '@/components/ui/icon-button';
import { Tooltip, type TooltipProps } from '@/components/ui/tooltip';

type Props = {
  tooltipProps: Omit<TooltipProps, 'children'>;
} & Omit<IconButtonProps, 'aria-label'>;

export const ArchiveButton = memo(function ArchiveButton(props: Props) {
  const { tooltipProps, ...rest } = props;
  const handleClick = useCallback(() => {}, []);

  return (
    <Tooltip showArrow {...tooltipProps}>
      <IconButton
        aria-label="Archive notifications"
        variant="ghost"
        h={6}
        minW={6}
        {...rest}
        onClick={handleClick}
      >
        <Icon icon="trashAlt" color="fg.muted" size="xs" />
      </IconButton>
    </Tooltip>
  );
});

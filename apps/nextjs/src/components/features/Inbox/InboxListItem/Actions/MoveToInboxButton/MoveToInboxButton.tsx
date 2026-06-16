import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/Icon';
import { IconButton, type IconButtonProps } from '@/components/ui/IconButton';
import { Tooltip, type TooltipProps } from '@/components/ui/Tooltip';

type Props = {
  tooltipProps: Omit<TooltipProps, 'children'>;
} & Omit<IconButtonProps, 'aria-label'>;

export const MoveToInboxButton = memo(function MoveToInboxButton(props: Props) {
  const { tooltipProps, ...rest } = props;
  const handleClick = useCallback(() => {}, []);

  return (
    <Tooltip showArrow {...tooltipProps}>
      <IconButton
        aria-label="Move to Inbox"
        variant="ghost"
        h={6}
        minW={6}
        {...rest}
        onClick={handleClick}
      >
        <Icon icon="arrowLeftAlt" color="fg.muted" size="xs" />
      </IconButton>
    </Tooltip>
  );
});

import { Tooltip, type TooltipProps } from '@/components/ui/Tooltip';
import { Icon } from '@/components/ui/atoms/Icon';
import {
  IconButton,
  type IconButtonProps,
} from '@/components/ui/atoms/IconButton';
import { memo, useCallback } from 'react';

type Props = {
  tooltipProps: Omit<TooltipProps, 'children'>;
} & Omit<IconButtonProps, 'aria-label'>;

export const ArchiveButton = memo(function ArchiveButton(props: Props) {
  const { tooltipProps, ...rest } = props;
  const handleClick = useCallback(() => {}, []);

  return (
    <Tooltip hasArrow {...tooltipProps}>
      <IconButton
        aria-label="Archive notifications"
        icon={<Icon icon="trashAlt" color="text.muted" size="xs" />}
        variant="ghost"
        h={6}
        minW={6}
        {...rest}
        onClick={handleClick}
      />
    </Tooltip>
  );
});

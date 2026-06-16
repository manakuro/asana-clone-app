import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/Icon';
import { IconButton, type IconButtonProps } from '@/components/ui/IconButton';
import { Tooltip } from '@/components/ui/Tooltip';

type Props = Omit<IconButtonProps, 'aria-label'>;

export const ArchiveButton = memo(function ArchiveButton(props: Props) {
  const handleClick = useCallback(() => {}, []);

  return (
    <Tooltip
      showArrow
      content="Archive notification"
      aria-label="Archive notification"
    >
      <IconButton
        aria-label="Archive notifications"
        variant="ghost"
        {...props}
        onClick={handleClick}
        disabled
      >
        <Icon icon="trashAlt" color="fg.muted" size="xs" />
      </IconButton>
    </Tooltip>
  );
});

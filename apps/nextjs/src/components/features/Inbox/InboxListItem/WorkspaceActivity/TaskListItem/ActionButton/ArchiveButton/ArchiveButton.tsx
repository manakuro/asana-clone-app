import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/Icon';
import { IconButton, type IconButtonProps } from '@/components/ui/IconButton';
import { Tooltip } from '@/components/ui/Tooltip';

type Props = Omit<IconButtonProps, 'aria-label'>;

export const ArchiveButton = memo(function ArchiveButton(props: Props) {
  const handleClick = useCallback(() => {}, []);

  return (
    <Tooltip
      hasArrow
      label="Archive notification"
      aria-label="Archive notification"
    >
      <IconButton
        aria-label="Archive notifications"
        icon={<Icon icon="trashAlt" color="text.muted" size="xs" />}
        variant="ghost"
        {...props}
        onClick={handleClick}
        isDisabled
      />
    </Tooltip>
  );
});

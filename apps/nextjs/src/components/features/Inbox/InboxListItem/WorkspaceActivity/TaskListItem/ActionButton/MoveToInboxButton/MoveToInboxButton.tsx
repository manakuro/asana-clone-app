import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/Icon';
import { IconButton, type IconButtonProps } from '@/components/ui/IconButton';
import { Tooltip } from '@/components/ui/Tooltip';

type Props = Omit<IconButtonProps, 'aria-label'>;

export const MoveToInboxButton = memo(function MoveToInboxButton(props: Props) {
  const handleClick = useCallback(() => {}, []);

  return (
    <Tooltip showArrow content="Move to Inbox" aria-label="Move to Inbox">
      <IconButton
        aria-label="Move to Inbox"
        variant="ghost"
        {...props}
        onClick={handleClick}
      >
        <Icon icon="arrowLeftAlt" color="text.muted" size="xs" />
      </IconButton>
    </Tooltip>
  );
});

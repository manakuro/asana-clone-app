import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/icon';
import { IconButton, type IconButtonProps } from '@/components/ui/icon-button';
import { Tooltip } from '@/components/ui/tooltip';

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
        <Icon icon="arrowLeftAlt" color="fg.muted" size="xs" />
      </IconButton>
    </Tooltip>
  );
});

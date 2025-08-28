import { Icon, IconButton, type IconButtonProps } from '@/components/ui/atoms';
import { Tooltip } from '@/components/ui/molecules';
import { memo, useCallback } from 'react';

type Props = {
  taskId: string;
} & Omit<IconButtonProps, 'aria-label'>;

export const MoveToInboxButton = memo(function MoveToInboxButton(props: Props) {
  const { taskId, ...rest } = props;
  const handleClick = useCallback(() => {}, []);

  return (
    <Tooltip hasArrow label="Move to Inbox" aria-label="Move to Inbox">
      <IconButton
        aria-label="Move to Inbox"
        icon={<Icon icon="arrowLeftAlt" color="text.muted" size="xs" />}
        variant="ghost"
        {...rest}
        onClick={handleClick}
      />
    </Tooltip>
  );
});

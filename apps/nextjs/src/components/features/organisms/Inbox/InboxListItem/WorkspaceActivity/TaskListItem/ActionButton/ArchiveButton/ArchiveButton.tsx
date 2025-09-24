import { Icon } from '@/components/ui/atoms/Icon';
import {
  IconButton,
  type IconButtonProps,
} from '@/components/ui/atoms/IconButton';
import { Tooltip } from '@/components/ui/molecules/Tooltip';
import { memo, useCallback } from 'react';

type Props = {
  taskId: string;
} & Omit<IconButtonProps, 'aria-label'>;

export const ArchiveButton = memo(function ArchiveButton(props: Props) {
  const { taskId, ...rest } = props;
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
        {...rest}
        onClick={handleClick}
        isDisabled
      />
    </Tooltip>
  );
});

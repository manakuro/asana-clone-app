import { memo } from 'react';
import { IconButton } from '@/components/ui/IconButton';
import { Icon } from '@/components/ui/icon';
import { Tooltip } from '@/components/ui/Tooltip';

type Props = {
  taskId: string;
};

export const Copy = memo(function Copy(_props: Props) {
  return (
    <Tooltip
      showArrow
      content="Copy task link"
      aria-label="Copy task link button description"
      size="sm"
    >
      <IconButton aria-label="Copy button" variant="ghost" size="sm" disabled>
        <Icon icon="copyAlt" color="fg.muted" />
      </IconButton>
    </Tooltip>
  );
});

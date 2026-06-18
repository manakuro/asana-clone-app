import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Tooltip } from '@/components/ui/tooltip';

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

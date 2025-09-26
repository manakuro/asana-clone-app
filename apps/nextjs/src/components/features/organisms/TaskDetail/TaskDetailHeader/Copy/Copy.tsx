import { Tooltip } from '@/components/ui/Tooltip';
import { Icon } from '@/components/ui/atoms/Icon';
import { IconButton } from '@/components/ui/atoms/IconButton';
import { memo } from 'react';

type Props = {
  taskId: string;
};

export const Copy = memo(function Copy(props: Props) {
  return (
    <Tooltip
      hasArrow
      label="Copy task link"
      aria-label="Copy task link button description"
      size="sm"
    >
      <IconButton
        aria-label="Copy button"
        icon={<Icon icon="copyAlt" color="text.muted" />}
        variant="ghost"
        size="sm"
        isDisabled
      />
    </Tooltip>
  );
});

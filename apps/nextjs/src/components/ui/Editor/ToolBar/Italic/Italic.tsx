import { memo } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { IconButtonProps } from '@/components/ui/IconButton';
import type { TooltipProps } from '@/components/ui/Tooltip';
import { useItalic } from '@/shared/prosemirror/hooks';
import { BaseButton } from '../BaseButton';

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'content'>;
};

export const Italic = memo(function Italic(props: Props) {
  const { action, isActive } = useItalic();

  return (
    <BaseButton
      aria-label="italic"
      {...props}
      action={action}
      tooltip={{
        content: 'Italic\n(⌘+i)',
        'aria-label': 'Italic',
        ...props.tooltip,
      }}
      isActive={isActive}
    >
      <Icon icon="italic" color="text.muted" />
    </BaseButton>
  );
});

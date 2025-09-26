import { Icon } from '@/components/ui/Icon';
import type { IconButtonProps } from '@/components/ui/IconButton';
import type { TooltipProps } from '@/components/ui/Tooltip';
import { useItalic } from '@/shared/prosemirror/hooks';
import { memo } from 'react';
import { BaseButton } from '../BaseButton';

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'children'>;
};

export const Italic = memo(function Italic(props: Props) {
  const { action, isActive } = useItalic();

  return (
    <BaseButton
      aria-label="italic"
      icon={<Icon icon="italic" color="text.muted" />}
      {...props}
      action={action}
      tooltip={{
        label: 'Italic\n(⌘+i)',
        'aria-label': 'Italic',
        ...props.tooltip,
      }}
      isActive={isActive}
    />
  );
});

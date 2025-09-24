import { Icon, type IconButtonProps } from '@/components/ui/atoms';
import type { TooltipProps } from '@/components/ui/molecules';
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

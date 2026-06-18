import type { PropsWithChildren } from 'react';
import { Tooltip, type TooltipProps } from '@/components/ui/tooltip';

type Props = Omit<TooltipProps, 'content'>;

export function ComingSoonTooltip(props: PropsWithChildren<Props>) {
  return (
    <Tooltip
      content={'This feature has not been implemented yet.\n Coming soon.'}
      aria-label="This feature has not been implemented yet. Coming soon!"
      size="md"
      withIcon
      {...props}
    />
  );
}

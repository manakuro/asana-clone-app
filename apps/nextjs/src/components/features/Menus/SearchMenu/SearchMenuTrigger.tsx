import { memo, type PropsWithChildren } from 'react';
import { Popover } from '@/components/ui/Popover';

type Props = PropsWithChildren;

export const SearchMenuTrigger = memo<Props>(function SearchMenuTrigger(props) {
  return <Popover.Trigger asChild>{props.children}</Popover.Trigger>;
});

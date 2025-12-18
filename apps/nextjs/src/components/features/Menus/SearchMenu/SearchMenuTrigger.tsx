import { memo, type PropsWithChildren } from 'react';
import { PopoverTrigger } from '@/components/ui/Popover';

type Props = PropsWithChildren;

export const SearchMenuTrigger = memo<Props>(function SearchMenuTrigger(props) {
  return <PopoverTrigger>{props.children}</PopoverTrigger>;
});

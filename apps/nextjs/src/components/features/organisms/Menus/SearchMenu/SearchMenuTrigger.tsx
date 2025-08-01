import { PopoverTrigger } from '@/components/ui/organisms/Popover';
import { type PropsWithChildren, memo } from 'react';

type Props = PropsWithChildren;

export const SearchMenuTrigger = memo<Props>(function SearchMenuTrigger(props) {
  return <PopoverTrigger>{props.children}</PopoverTrigger>;
});

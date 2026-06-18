import { memo } from 'react';
import { Popover, type PopoverRootProps } from '@/components/ui/popover';

type Props = PopoverRootProps;

export const SearchMenu = memo(function SearchMenu({
  children,
  ...rest
}: Props) {
  return (
    <Popover.Root
      closeOnInteractOutside={false}
      autoFocus={false}
      lazyMount
      {...rest}
    >
      {children}
    </Popover.Root>
  );
});

import { Flex, Portal } from '@/components/ui/atoms';
import {
  PopoverContent,
  type PopoverContentProps,
} from '@/components/ui/organisms/Popover';
import { useClickOutside } from '@/hooks';
import { memo } from 'react';
import { useSearchMenuRef } from '../useSearchMenuRef';

type Props = PopoverContentProps & {
  onClose: () => void;
};

export const SearchMenuContent = memo(function SearchMenuContent(props: Props) {
  const { onClose, children, ...rest } = props;
  const { ref } = useClickOutside<HTMLDivElement>(onClose, {
    hasClickedOutside: (e, helpers) => {
      if (helpers.isContainInPopoverTrigger(e)) return false;
      return true;
    },
  });
  const { ref: containerRef } = useSearchMenuRef();

  return (
    <Portal>
      <PopoverContent
        className="focus-visible"
        w="450px"
        maxH={56}
        ref={containerRef}
        {...rest}
      >
        <Flex flexDirection="column" ref={ref}>
          {children}
        </Flex>
      </PopoverContent>
    </Portal>
  );
});

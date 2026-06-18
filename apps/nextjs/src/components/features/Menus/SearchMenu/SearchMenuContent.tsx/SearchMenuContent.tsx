import { memo, type PropsWithChildren } from 'react';
import { Flex } from '@/components/ui/flex';
import { Popover, type PopoverContentProps } from '@/components/ui/popover';
import { Portal } from '@/components/ui/portal';
import { useClickOutside } from '@/hooks';
import { useSearchMenuRef } from '../useSearchMenuRef';

type Props = {
  onClose: () => void;
} & PopoverContentProps;

export const SearchMenuContent = memo(function SearchMenuContent(
  props: PropsWithChildren<Props>,
) {
  const { onClose, children, ...rest } = props;
  const { ref } = useClickOutside<HTMLDivElement>(onClose, {
    hasClickedOutside: (e, helpers) => {
      if (helpers.isContainInPopoverTrigger(e)) return false;
      return true;
    },
  });
  const { ref: containerRef } = useSearchMenuRef<HTMLDivElement>();

  return (
    <Portal>
      <Popover.Positioner>
        <Popover.Content
          className="focus-visible"
          w="450px"
          maxH={56}
          ref={containerRef}
          {...rest}
        >
          <Popover.Body>
            <Flex flexDirection="column" ref={ref}>
              {children}
            </Flex>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  );
});

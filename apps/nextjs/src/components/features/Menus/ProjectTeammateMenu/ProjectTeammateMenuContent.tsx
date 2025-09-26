import { useSearchMenuRef } from '@/components/features/Menus/SearchMenu';
import { Flex } from '@/components/ui/Flex';
import {
  PopoverContent,
  type PopoverContentProps,
} from '@/components/ui/Popover';
import { Portal } from '@/components/ui/Portal';
import { useClickOutside } from '@/hooks';
import { memo } from 'react';

type Props = PopoverContentProps & {
  onClose: () => void;
};

export const ProjectTeammateMenuContent = memo(
  function ProjectTeammateMenuContent(props: Props) {
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
          overflowY="scroll"
          {...rest}
        >
          <Flex flexDirection="column" ref={ref}>
            {children}
          </Flex>
        </PopoverContent>
      </Portal>
    );
  },
);

import { memo } from 'react';
import { useSearchMenuRef } from '@/components/features/Menus/SearchMenu';
import { Flex } from '@/components/ui/flex';
import { Popover, type PopoverContentProps } from '@/components/ui/popover';
import { Portal } from '@/components/ui/portal';
import { useClickOutside } from '@/hooks';

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
    const { ref: containerRef } = useSearchMenuRef<HTMLDivElement>();

    return (
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            className="focus-visible"
            w="450px"
            maxH={56}
            ref={containerRef}
            overflowY="scroll"
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
  },
);

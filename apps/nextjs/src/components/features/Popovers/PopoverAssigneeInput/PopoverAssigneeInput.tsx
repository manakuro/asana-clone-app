import React, { type PropsWithChildren, useCallback } from 'react';
import { Link } from '@/components/ui/link';
import { Popover } from '@/components/ui/popover';
import { Portal } from '@/components/ui/portal';
import { useDisclosure } from '@/shared/chakra';
import { Content } from './Content';

type Props = {
  taskId: string;
  onOpened?: () => void;
  onClosed?: () => void;
};

export function PopoverAssigneeInput(props: PropsWithChildren<Props>) {
  const { taskId } = props;
  const popoverDisclosure = useDisclosure();
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleOpen = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.stopPropagation();
      popoverDisclosure.onOpen();
      props.onOpened?.();
    },
    [popoverDisclosure, props],
  );

  const handleClose = useCallback(() => {
    popoverDisclosure.onClose();
    // Prevent flush when closing popover
    setTimeout(() => {
      props.onClosed?.();
    }, 60);
  }, [popoverDisclosure, props]);

  return (
    <Popover.Root
      positioning={{ placement: 'bottom-end' }}
      open={popoverDisclosure.open}
      initialFocusEl={() => inputRef.current}
      lazyMount
      closeOnInteractOutside={false}
    >
      <Popover.Trigger asChild>
        <Link onClick={handleOpen}>{props.children}</Link>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          {popoverDisclosure.open && (
            <Content taskId={taskId} onClose={handleClose} />
          )}
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}

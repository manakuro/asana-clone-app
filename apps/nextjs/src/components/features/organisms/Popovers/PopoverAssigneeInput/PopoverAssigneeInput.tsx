import { Link, PortalManager } from '@/components/ui/atoms';
import {
  Popover,
  type PopoverProps,
  PopoverTrigger,
} from '@/components/ui/organisms/Popover';
import { useDisclosure } from '@/shared/chakra';
import React, { useCallback } from 'react';
import { Content } from './Content';

type Props = {
  taskId: string;
  onOpened?: () => void;
  onClosed?: () => void;
} & PopoverProps;

export function PopoverAssigneeInput(props: Props) {
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
    <PortalManager zIndex={1500}>
      <Popover
        placement="bottom-end"
        isOpen={popoverDisclosure.isOpen}
        initialFocusRef={inputRef}
        isLazy
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Link onClick={handleOpen}>{props.children}</Link>
        </PopoverTrigger>
        {popoverDisclosure.isOpen && (
          <Content taskId={taskId} onClose={handleClose} />
        )}
      </Popover>
    </PortalManager>
  );
}

import { Link } from '@/components/ui/Link';
import {
  Popover,
  PopoverContent,
  type PopoverProps,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { Portal } from '@/components/ui/Portal';
import { PortalManager } from '@/components/ui/PortalManager';
import { type ChakraProps, useDisclosure } from '@/shared/chakra';
import type { MouseEvent, PropsWithChildren } from 'react';
import { useCallback } from 'react';
import { Body } from './Body';

type Props = {
  date: string;
  onChange: (date: Date) => void;
  onClear: () => void;
  time?: string;
  onOpened?: () => void;
  onClosed?: () => void;
  linkStyle?: ChakraProps;
  closeOnChange?: boolean;
  defaultIsOpen?: boolean;
  includeDueTime?: boolean;
} & PopoverProps;

export function PopoverDueDatePicker(props: PropsWithChildren<Props>) {
  const popoverDisclosure = useDisclosure({
    defaultIsOpen: props.defaultIsOpen,
  });
  const closeOnChange = props.closeOnChange ?? true;

  const handleOpen = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      popoverDisclosure.onOpen();
      props.onOpened?.();
    },
    [popoverDisclosure, props],
  );

  const handleClose = useCallback(() => {
    popoverDisclosure.onClose();
  }, [popoverDisclosure]);

  const handleChange = useCallback(
    (date: Date) => {
      props.onChange(date);
      if (!closeOnChange) return;
      popoverDisclosure.onClose();
    },
    [closeOnChange, popoverDisclosure, props],
  );

  const handleClear = useCallback(() => {
    props.onClear();
    if (!closeOnChange) return;
    popoverDisclosure.onClose();
  }, [closeOnChange, popoverDisclosure, props]);

  return (
    <PortalManager zIndex={1500}>
      <Popover
        isOpen={popoverDisclosure.isOpen}
        isLazy
        lazyBehavior="keepMounted"
        closeOnBlur={false}
        autoFocus={false}
        returnFocusOnClose={false}
      >
        <PopoverTrigger>
          <Link {...props.linkStyle} onClick={handleOpen}>
            {props.children}
          </Link>
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            w="276px"
            minH="280px"
            className="PopoverDueDatePicker"
            pointerEvents="auto"
          >
            {popoverDisclosure.isOpen && (
              <Body
                date={props.date}
                onChange={handleChange}
                time={props.time}
                onCloseMenu={handleClose}
                onClear={handleClear}
                includeDueTime={props.includeDueTime}
              />
            )}
          </PopoverContent>
        </Portal>
      </Popover>
    </PortalManager>
  );
}

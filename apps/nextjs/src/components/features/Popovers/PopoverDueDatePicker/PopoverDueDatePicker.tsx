import type { MouseEvent, PropsWithChildren } from 'react';
import { useCallback } from 'react';
import { Link } from '@/components/ui/Link';
import { Popover, type PopoverRootProps } from '@/components/ui/Popover';
import { Portal } from '@/components/ui/Portal';
import { type SystemStyleObject, useDisclosure } from '@/shared/chakra';
import { Body } from './Body';

type Props = {
  date: string;
  onChange: (date: Date) => void;
  onClear: () => void;
  time?: string;
  onOpened?: () => void;
  onClosed?: () => void;
  linkStyle?: SystemStyleObject;
  closeOnChange?: boolean;
  defaultOpen?: boolean;
  includeDueTime?: boolean;
} & PopoverRootProps;

export function PopoverDueDatePicker(props: PropsWithChildren<Props>) {
  const popoverDisclosure = useDisclosure({
    defaultOpen: props.defaultOpen,
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
    <Popover.Root
      open={popoverDisclosure.open}
      lazyMount
      closeOnInteractOutside={false}
      autoFocus={false}
    >
      <Popover.Trigger asChild>
        <Link {...props.linkStyle} onClick={handleOpen}>
          {props.children}
        </Link>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner
          w="276px"
          minH="280px"
          className="PopoverDueDatePicker"
          pointerEvents="auto"
        >
          <Popover.Content>
            {popoverDisclosure.open && (
              <Body
                date={props.date}
                onChange={handleChange}
                time={props.time}
                onCloseMenu={handleClose}
                onClear={handleClear}
                includeDueTime={props.includeDueTime}
              />
            )}
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}

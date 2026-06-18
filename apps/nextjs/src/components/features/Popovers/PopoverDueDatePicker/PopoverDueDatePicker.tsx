import type { PropsWithChildren } from 'react';
import { useCallback } from 'react';
import { Link } from '@/components/ui/link';
import { Popover, type PopoverRootProps } from '@/components/ui/popover';
import { Portal } from '@/components/ui/portal';
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

  const handleOpen = useCallback(() => {
    popoverDisclosure.onOpen();
    props.onOpened?.();
  }, [popoverDisclosure, props]);

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
      autoFocus={false}
      onOpenChange={(e) => {
        if (e.open) {
          handleOpen();
        } else {
          handleClose();
          props.onClosed?.();
        }
      }}
    >
      <Popover.Trigger asChild onClick={(e) => e.stopPropagation()}>
        <Link {...props.linkStyle}>{props.children}</Link>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
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

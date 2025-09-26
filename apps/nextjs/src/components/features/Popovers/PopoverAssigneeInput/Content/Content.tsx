import {
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  type PopoverProps,
} from '@/components/ui/Popover';
import { Portal } from '@/components/ui/Portal';
import { Stack } from '@/components/ui/Stack';
import { Text } from '@/components/ui/Text';
import { useClickOutside } from '@/hooks';
import type { MouseEvent } from 'react';
import { AssignToMeButton } from './AssignToMeButton';
import { Input } from './Input';

type Props = {
  taskId: string;
  onClose: () => void;
} & PopoverProps;

export function Content(props: Props) {
  const { onClose, taskId } = props;
  const { ref } = useClickOutside<HTMLDivElement>(onClose, {
    hasClickedOutside: (e, helpers) => {
      if (helpers.isContainInPopoverContent(e)) return false;
      return true;
    },
  });

  return (
    <Portal>
      <PopoverContent
        w="400px"
        ref={ref}
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        <PopoverHeader border="none">
          <Text fontSize="xs" color="text.muted">
            Assignee
          </Text>
        </PopoverHeader>
        <PopoverCloseButton onClick={props.onClose} color="text.muted" />
        <PopoverBody>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Input taskId={taskId} onClose={onClose} />
            <Text as="span" fontSize="sm">
              or
            </Text>
            <AssignToMeButton taskId={taskId} onClose={onClose} />
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Portal>
  );
}

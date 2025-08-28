import { Portal, Stack, Text } from '@/components/ui/atoms';
import {
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  type PopoverProps,
} from '@/components/ui/organisms/Popover';
import { useClickOutside } from '@/hooks';
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
      <PopoverContent w="400px" ref={ref} onClick={(e) => e.stopPropagation()}>
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

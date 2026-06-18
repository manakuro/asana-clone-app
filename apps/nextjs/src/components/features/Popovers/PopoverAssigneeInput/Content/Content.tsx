import type { MouseEvent } from 'react';
import { Popover } from '@/components/ui/popover';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { useClickOutside } from '@/hooks';
import { AssignToMeButton } from './AssignToMeButton';
import { Input } from './Input';

type Props = {
  taskId: string;
  onClose: () => void;
};

export function Content(props: Props) {
  const { onClose, taskId } = props;
  const { ref } = useClickOutside<HTMLDivElement>(onClose, {
    hasClickedOutside: (e, helpers) => {
      if (helpers.isContainInPopoverContent(e)) return false;
      return true;
    },
  });

  return (
    <Popover.Content
      w="400px"
      ref={ref}
      onClick={(e: MouseEvent) => e.stopPropagation()}
    >
      <Popover.CloseTrigger onClick={props.onClose} color="fg.muted" />
      <Popover.Header border="none">
        <Text fontSize="xs" color="fg.muted">
          Assignee
        </Text>
      </Popover.Header>
      <Popover.Body>
        <Stack
          gap={2}
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
      </Popover.Body>
    </Popover.Content>
  );
}

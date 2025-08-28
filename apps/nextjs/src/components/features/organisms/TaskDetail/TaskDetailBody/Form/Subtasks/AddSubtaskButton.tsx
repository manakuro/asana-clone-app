import { Button, type ButtonProps, Icon } from '@/components/ui/atoms';
import { memo } from 'react';

type Props = ButtonProps;

export const AddSubtaskButton = memo(function AddSubtaskButton(props: Props) {
  return (
    <Button
      mt={2}
      ml="-10px"
      aria-label="Add subtask"
      leftIcon={<Icon icon="plus" />}
      variant="ghost"
      size="xs"
      fontWeight="medium"
      color="text.muted"
      {...props}
    >
      Add subtask
    </Button>
  );
});

import { Button, type ButtonProps } from '@/components/ui/atoms/Button';
import { Icon } from '@/components/ui/atoms/Icon';
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

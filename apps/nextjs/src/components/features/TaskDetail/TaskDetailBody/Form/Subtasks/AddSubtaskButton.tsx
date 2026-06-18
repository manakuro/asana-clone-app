import { memo } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

type Props = ButtonProps;

export const AddSubtaskButton = memo(function AddSubtaskButton(props: Props) {
  return (
    <Button
      mt={2}
      ml="-10px"
      aria-label="Add subtask"
      variant="ghost"
      size="xs"
      fontWeight="medium"
      color="fg.muted"
      {...props}
    >
      <Icon icon="plus" />
      Add subtask
    </Button>
  );
});

import { memo } from 'react';
import { Button } from '@/components/ui/Button';
import { Box } from '@/components/ui/box';
import { Flex } from '@/components/ui/Flex';
import { Input } from '../Input';

type Props = {
  taskId: string;
  onClick: () => void;
  onClose: () => void;
  open: boolean;
};

export const UnSelected = memo(function UnSelected(props: Props) {
  const { open, onClose, taskId, onClick } = props;

  return (
    <Flex flex={1}>
      {open ? (
        <Input onClose={onClose} taskId={taskId} />
      ) : (
        <Button
          as={Box}
          variant="ghost"
          size="sm"
          border="1px"
          borderColor="transparent"
          onClick={onClick}
          cursor="pointer"
          fontSize="sm"
        >
          Add to projects
        </Button>
      )}
    </Flex>
  );
});

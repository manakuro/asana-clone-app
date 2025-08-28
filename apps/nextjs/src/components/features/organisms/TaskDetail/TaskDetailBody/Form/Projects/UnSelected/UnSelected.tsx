import { Box, Button, Flex } from '@/components/ui/atoms';
import { memo } from 'react';
import { Input } from '../Input';

type Props = {
  taskId: string;
  onClick: () => void;
  onClose: () => void;
  isOpen: boolean;
};

export const UnSelected = memo(function UnSelected(props: Props) {
  const { isOpen, onClose, taskId, onClick } = props;

  return (
    <Flex flex={1}>
      {isOpen ? (
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

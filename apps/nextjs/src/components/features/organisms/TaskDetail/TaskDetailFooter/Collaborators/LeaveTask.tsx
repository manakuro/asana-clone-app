import { Button, Flex, Icon } from '@/components/ui/atoms';
import { Tooltip } from '@/components/ui/molecules';
import type React from 'react';
import { memo } from 'react';
import { useCollaboratorsContext } from './Provider';

export const LeaveTask: React.FC = memo(() => {
  const { isInputFocused } = useCollaboratorsContext();

  if (isInputFocused) return null;

  return (
    <Flex alignItems="center" ml="auto" mt={1}>
      <Tooltip
        hasArrow
        label="Stop getting notifications about activity on this task."
        aria-label="A leave task button description"
        size="md"
      >
        <Button
          leftIcon={<Icon icon="bell" mt="-1px" size="xs" />}
          variant="ghost"
          size="xs"
          fontWeight="medium"
          color="text.muted"
        >
          Leave task
        </Button>
      </Tooltip>
    </Flex>
  );
});

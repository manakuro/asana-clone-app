import { memo } from 'react';
import { Button } from '@/components/ui/Button';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Tooltip } from '@/components/ui/Tooltip';
import { useCollaboratorsContext } from './Provider';

export const LeaveTask = memo(() => {
  const { isInputFocused } = useCollaboratorsContext();

  if (isInputFocused) return null;

  return (
    <Flex alignItems="center" ml="auto" mt={1}>
      <Tooltip
        showArrow
        content="Stop getting notifications about activity on this task."
        aria-label="A leave task button description"
        size="md"
      >
        <Button variant="ghost" size="xs" fontWeight="medium" color="fg.muted">
          <Icon icon="bell" mt="-1px" size="xs" />
          Leave task
        </Button>
      </Tooltip>
    </Flex>
  );
});

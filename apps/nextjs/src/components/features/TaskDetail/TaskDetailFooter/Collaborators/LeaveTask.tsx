import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Tooltip } from '@/components/ui/tooltip';
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

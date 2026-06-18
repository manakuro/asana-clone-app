import { memo, useMemo } from 'react';
import { useTasksCalendarContext } from '@/components/features/Tasks';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Popover } from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { dateFns } from '@/shared/dateFns';
import { Content } from './Content';

export const CalendarMonthPicker = memo(function CalendarMonthPicker() {
  const { currentDate } = useTasksCalendarContext();
  const dateText = useMemo(() => {
    return dateFns.format(currentDate, 'MMMM y');
  }, [currentDate]);

  return (
    <Flex alignItems="center">
      <Text fontWeight="medium">{dateText}</Text>
      <Popover.Root lazyMount positioning={{ placement: 'bottom-start' }}>
        <Popover.Trigger asChild>
          <IconButton
            ml={1}
            h={6}
            aria-label="Pick month"
            variant="ghost"
            size="sm"
          >
            <Icon icon="chevronDown" color="fg.muted" />
          </IconButton>
        </Popover.Trigger>
        <Content />
      </Popover.Root>
    </Flex>
  );
});

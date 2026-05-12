import { memo, useMemo } from 'react';
import { useTasksCalendarContext } from '@/components/features/Tasks';
import { Flex, type FlexProps } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Link } from '@/components/ui/Link';
import { Popover } from '@/components/ui/Popover';
import { Text } from '@/components/ui/Text';
import { useDisclosure } from '@/shared/chakra';
import { dateFns } from '@/shared/dateFns';
import { Content } from './Content';

type Props = FlexProps;

export const CalendarMonthPicker = memo(function CalendarMonthPicker(
  props: Props,
) {
  const { currentDate } = useTasksCalendarContext();
  const dateText = useMemo(() => {
    return dateFns.format(currentDate, 'MMMM y');
  }, [currentDate]);

  const popoverDisclosure = useDisclosure();

  return (
    <Flex {...props} alignItems="center">
      <Text fontWeight="medium">{dateText}</Text>
      <Popover.Root
        open={popoverDisclosure.open}
        lazyMount
        closeOnInteractOutside={false}
        positioning={{ placement: 'bottom-start' }}
      >
        <Popover.Trigger asChild>
          <Link onClick={popoverDisclosure.onOpen}>
            <IconButton
              ml={1}
              h={6}
              aria-label="Pick month"
              variant="ghost"
              size="sm"
            >
              <Icon icon="chevronDown" color="fg.muted" />
            </IconButton>
          </Link>
        </Popover.Trigger>
        {popoverDisclosure.open && (
          <Content onClose={popoverDisclosure.onClose} />
        )}
      </Popover.Root>
    </Flex>
  );
});

import { useTasksCalendarContext } from '@/components/features/Tasks';
import { Flex, type FlexProps } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Link } from '@/components/ui/Link';
import { Popover, PopoverTrigger } from '@/components/ui/Popover';
import { PortalManager } from '@/components/ui/PortalManager';
import { Text } from '@/components/ui/Text';
import { useDisclosure } from '@/shared/chakra';
import { dateFns } from '@/shared/dateFns';
import { memo, useMemo } from 'react';
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
      <PortalManager zIndex={1500}>
        <Popover
          isOpen={popoverDisclosure.isOpen}
          isLazy
          closeOnBlur={false}
          placement="bottom-start"
        >
          <PopoverTrigger>
            <Link onClick={popoverDisclosure.onOpen}>
              <IconButton
                ml={1}
                h={6}
                aria-label="Pick month"
                icon={<Icon icon="chevronDown" color="text.muted" />}
                variant="ghost"
                size="sm"
              />
            </Link>
          </PopoverTrigger>
          {popoverDisclosure.isOpen && (
            <Content onClose={popoverDisclosure.onClose} />
          )}
        </Popover>
      </PortalManager>
    </Flex>
  );
});

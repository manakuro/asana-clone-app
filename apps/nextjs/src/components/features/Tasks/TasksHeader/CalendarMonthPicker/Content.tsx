import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTasksCalendarContext } from '@/components/features/Tasks';
import { Flex, type FlexProps } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Popover } from '@/components/ui/Popover';
import { Portal } from '@/components/ui/Portal';
import { Text } from '@/components/ui/Text';
import { useClickableHoverStyle, useClickOutside } from '@/hooks';
import { dateFns } from '@/shared/dateFns';

type Props = {
  onClose: () => void;
};

export function Content(props: Props) {
  const { onClose } = props;
  const { ref } = useClickOutside<HTMLDivElement>(onClose);
  const { currentDate, setMonth, scrollToDate } = useTasksCalendarContext();
  const [date, setDate] = useState<Date>(currentDate);

  const handleNextYear = useCallback(() => {
    setDate((s) => dateFns.addYears(s, 1));
  }, []);

  const handlePrevYear = useCallback(() => {
    setDate((s) => dateFns.subYears(s, 1));
  }, []);

  const months = useMemo<Date[]>(() => {
    const start = dateFns.startOfYear(date);
    const end = dateFns.endOfYear(date);
    return dateFns.eachMonthOfInterval({ start, end });
  }, [date]);

  const { clickableHoverTextStyle } = useClickableHoverStyle();

  const currentMonthStyle = useCallback(
    (val: Date): FlexProps => {
      if (dateFns.isSameMonth(date, val))
        return {
          _after: {
            bg: 'primary',
            bottom: 1,
            content: '""',
            height: '2px',
            left: 3,
            position: 'absolute',
            right: 3,
            color: 'primary',
          },
          fontWeight: 'bold',
        };

      return {};
    },
    [date],
  );

  const handleClickMonth = useCallback(
    (date: Date) => {
      setMonth(date);
      onClose();
      scrollToDate(date);
    },
    [setMonth, onClose, scrollToDate],
  );

  useEffect(() => {
    setDate(currentDate);
  }, [currentDate]);

  return (
    <Portal>
      <Popover.Positioner>
        <Popover.Content w="210px" maxW="210px" h="145px" ref={ref}>
          <Popover.Header>
            <Flex>
              <Icon
                icon="chevronLeft"
                color="fg.muted"
                onClick={handlePrevYear}
                cursor="pointer"
              />
              <Text flex={1} fontSize="sm" textAlign="center">
                {dateFns.format(date, 'y')}
              </Text>
              <Icon
                icon="chevronRight"
                color="fg.muted"
                onClick={handleNextYear}
                cursor="pointer"
              />
            </Flex>
          </Popover.Header>
          <Popover.Body>
            <Flex flexWrap="wrap" flex={1}>
              {months.map((d) => (
                <Flex
                  key={dateFns.formatISO(d, { representation: 'date' })}
                  fontSize="sm"
                  color="fg.muted"
                  cursor="pointer"
                  textTransform="uppercase"
                  w="25%"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                  onClick={() => handleClickMonth(d)}
                  css={clickableHoverTextStyle}
                  {...currentMonthStyle(d)}
                >
                  {dateFns.format(d, 'MMM')}
                </Flex>
              ))}
            </Flex>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  );
}

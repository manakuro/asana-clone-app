import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTasksCalendarContext } from '@/components/features/Tasks';
import { Button } from '@/components/ui/Button';
import { Flex } from '@/components/ui/Flex';
import { Grid } from '@/components/ui/Grid';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Popover } from '@/components/ui/Popover';
import { Portal } from '@/components/ui/Portal';
import { Text } from '@/components/ui/Text';
import { useClickOutside } from '@/hooks';
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

  const selectedMonth = useCallback(
    (d: Date) => dateFns.isSameMonth(date, d),
    [date],
  );
  const currentMonth = useCallback((d: Date) => {
    return dateFns.isSameMonth(new Date(), d);
  }, []);
  const variant = useCallback(
    (d: Date) => {
      if (selectedMonth(d)) return 'solid';
      if (currentMonth(d)) return 'outline';
      return 'ghost';
    },
    [currentMonth, selectedMonth],
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
        <Popover.Content ref={ref}>
          <Popover.Header>
            <Flex alignItems="center">
              <IconButton
                onClick={handlePrevYear}
                cursor="pointer"
                variant="ghost"
              >
                <Icon icon="chevronLeft" color="fg.muted" />
              </IconButton>

              <Text flex={1} fontSize="sm" textAlign="center">
                {dateFns.format(date, 'y')}
              </Text>
              <IconButton
                onClick={handleNextYear}
                cursor="pointer"
                variant="ghost"
              >
                <Icon icon="chevronRight" color="fg.muted" />
              </IconButton>
            </Flex>
          </Popover.Header>
          <Popover.Body>
            <Grid templateColumns="repeat(4, 1fr)" gap={2}>
              {months.map((d) => (
                <Button
                  key={dateFns.formatISO(d, { representation: 'date' })}
                  fontSize="sm"
                  cursor="pointer"
                  textTransform="uppercase"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                  onClick={() => handleClickMonth(d)}
                  variant={variant(d)}
                  colorPalette="teal"
                >
                  {dateFns.format(d, 'MMM')}
                </Button>
              ))}
            </Grid>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  );
}

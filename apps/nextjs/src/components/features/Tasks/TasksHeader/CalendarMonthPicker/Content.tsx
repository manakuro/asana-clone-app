import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTasksCalendarContext } from '@/components/features/Tasks';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import { Grid } from '@/components/ui/grid';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Popover, usePopoverContext } from '@/components/ui/popover';
import { Portal } from '@/components/ui/portal';
import { Text } from '@/components/ui/text';
import { dateFns } from '@/shared/dateFns';

export function Content() {
  const { setOpen } = usePopoverContext();
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
      setOpen(false);
      scrollToDate(date);
    },
    [setMonth, setOpen, scrollToDate],
  );

  useEffect(() => {
    setDate(currentDate);
  }, [currentDate]);

  return (
    <Portal>
      <Popover.Positioner>
        <Popover.Content>
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

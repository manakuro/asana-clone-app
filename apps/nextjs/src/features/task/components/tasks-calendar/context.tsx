import { addMonths, isLastDayOfMonth, subMonths } from 'date-fns';
import { useCallback, useMemo, useState } from 'react';
import { getCalendarMatrix } from '@/lib/date';
import { createContext } from '@/lib/react/create-context';
import { isHTMLElement } from '@/utils/is-html-element';
import { useTasksCalendarId } from './use-tasks-calendar-id';

const useValue = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [baseDate, setBaseDate] = useState(new Date());
  const { getCalendarListId, getCalendarListItemId } = useTasksCalendarId();
  const [resetCount, setResetCount] = useState(0);

  const incrementResetCount = useCallback(() => {
    setResetCount((s) => s + 1);
  }, []);

  const onNextMonth = useCallback((date: string) => {
    const newDate = new Date(date);
    setCurrentDate(addMonths(newDate, 1));
  }, []);

  const onPrevMonth = useCallback((date: string) => {
    const newDate = new Date(date);
    setCurrentDate(newDate);
  }, []);

  const setMonth = useCallback((date: Date) => {
    setCurrentDate(date);
    setBaseDate(date);
  }, []);

  const resetMonth = useCallback(() => {
    setMonth(new Date());
    setBaseDate(new Date());
    incrementResetCount();
  }, [setMonth, incrementResetCount]);

  const calendarRows = useMemo<Date[][]>(
    () => getCalendarMatrix(subMonths(baseDate, 6), addMonths(baseDate, 6)),
    [baseDate],
  );

  /**
   * Determines whether the given calendar row (a week) contains the last day
   * of a month.
   *
   * The calendar renders a continuous stream of weekly rows spanning multiple
   * months, rather than being paginated per month. To keep the displayed
   * month label in sync with scrolling, only these "month boundary" rows are
   * observed via IntersectionObserver — observing every row would fire
   * onNextMonth/onPrevMonth multiple times per month.
   */
  const isMonthBoundaryRow = useCallback(
    (row: Date[]) => {
      return !!(
        calendarRows
          .filter((c) => c.some((date) => isLastDayOfMonth(date)))
          .find((c) => getCalendarListId(c[0]) === getCalendarListId(row[0])) ??
        false
      );
    },
    [calendarRows, getCalendarListId],
  );

  const onVisibleWhenScrollUp = useCallback((id: string) => {
    setBaseDate((s) => subMonths(s, 3));
    console.log('handleVisibleWhenScrollUp: ', id);
  }, []);

  const onVisibleWhenScrollDown = useCallback((id: string) => {
    setBaseDate((s) => addMonths(s, 3));
    console.log('handleVisibleWhenScrollDown: ', id);
  }, []);

  const scrollToDate = useCallback(
    (date: Date) => {
      setTimeout(() => {
        const element = document.getElementById(getCalendarListItemId(date));
        if (!isHTMLElement(element)) return;

        element.scrollIntoView();
      });
    },
    [getCalendarListItemId],
  );

  return {
    calendarRows,
    onVisibleWhenScrollUp,
    onVisibleWhenScrollDown,
    isMonthBoundaryRow,
    currentDate,
    onNextMonth,
    onPrevMonth,
    resetMonth,
    resetCount,
    setMonth,
    scrollToDate,
  };
};
export const { Context, useContext: useTasksCalendarContext } = createContext(
  useValue,
  '@/components/features/tasks/tasks-calendar/context.tsx',
);

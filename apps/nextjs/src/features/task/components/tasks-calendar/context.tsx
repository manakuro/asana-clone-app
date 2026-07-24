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
    if (Number.isNaN(newDate.getTime())) {
      console.error('[onNextMonth] Invalid date string received:', date);
      return;
    }
    setCurrentDate(addMonths(newDate, 1));
  }, []);

  const onPrevMonth = useCallback((date: string) => {
    const newDate = new Date(date);
    if (Number.isNaN(newDate.getTime())) {
      console.error('[onPrevMonth] Invalid date string received:', date);
      return;
    }
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
      const rowId = getCalendarListId(row[0]);
      return calendarRows.some(
        (c) =>
          c.some((date) => isLastDayOfMonth(date)) &&
          getCalendarListId(c[0]) === rowId,
      );
    },
    [calendarRows, getCalendarListId],
  );

  /**
   * Extends `baseDate` 3 months into the past, growing the range that
   * `calendarRows` is generated from. Called when the user scrolls near
   * the top of the currently rendered range (10 rows from the top),
   * preloading additional past weeks before the user reaches the boundary.
   */
  const loadPastMonths = useCallback((_id: string) => {
    setBaseDate((s) => subMonths(s, 3));
  }, []);

  /**
   * Extends `baseDate` 3 months into the future, growing the range that
   * `calendarRows` is generated from. Called when the user scrolls near
   * the bottom of the currently rendered range (10 rows from the end),
   * preloading additional future weeks before the user reaches the boundary.
   */
  const loadFutureMonths = useCallback((_id: string) => {
    setBaseDate((s) => addMonths(s, 3));
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
    loadPastMonths,
    loadFutureMonths,
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

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

  /**
   * Extends `baseDate` 3 months into the past, growing the range that
   * `calendarRows` is generated from. Called when the user scrolls up and
   * reaches the top of the currently rendered range, so more past weeks
   * become available to scroll into.
   */
  const loadPastMonths = useCallback((id: string) => {
    setBaseDate((s) => subMonths(s, 3));
    console.log(
      '[loadPastMonths] extending range 3 months into the past, triggered by row: ',
      id,
    );
  }, []);

  /**
   * Extends `baseDate` 3 months into the future, growing the range that
   * `calendarRows` is generated from. Called when the user scrolls down and
   * reaches the bottom of the currently rendered range, so more future weeks
   * become available to scroll into.
   */
  const loadFutureMonths = useCallback((id: string) => {
    setBaseDate((s) => addMonths(s, 3));
    console.log(
      '[loadFutureMonths] extending range 3 months into the future, triggered by row: ',
      id,
    );
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

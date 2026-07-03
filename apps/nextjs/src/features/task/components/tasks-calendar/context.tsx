import { useCallback, useMemo, useState } from 'react';
import { getCalendarMatrix } from '@/lib/date';
import { dateFns } from '@/lib/date-fns';
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

  const onNextMonth = useCallback(() => {
    setCurrentDate((s) => dateFns.addMonths(s, 1));
  }, []);

  const onPrevMonth = useCallback(() => {
    setCurrentDate((s) => dateFns.subMonths(s, 1));
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
    () =>
      getCalendarMatrix(
        dateFns.subMonths(baseDate, 6),
        dateFns.addMonths(baseDate, 6),
      ),
    [baseDate],
  );

  const isSecondRowOfMonth = useCallback(
    (row: Date[]) => {
      return !!(
        calendarRows
          .filter((c) => c.some((date) => dateFns.isLastDayOfMonth(date)))
          .find((c) => getCalendarListId(c[0]) === getCalendarListId(row[0])) ??
        false
      );
    },
    [calendarRows, getCalendarListId],
  );

  const onVisibleWhenScrollUp = useCallback((id: string) => {
    setBaseDate((s) => dateFns.subMonths(s, 3));
    console.log('handleVisibleWhenScrollUp: ', id);
  }, []);

  const onVisibleWhenScrollDown = useCallback((id: string) => {
    setBaseDate((s) => dateFns.addMonths(s, 3));
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
    isSecondRowOfMonth,
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

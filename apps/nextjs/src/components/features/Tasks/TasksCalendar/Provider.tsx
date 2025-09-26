import { getCalendarMatrix } from '@/shared/date';
import { dateFns } from '@/shared/dateFns';
import { isHTMLElement } from '@/shared/isHTMLElement';
import { createProvider } from '@/shared/react/createProvider';
import { useCallback, useMemo, useState } from 'react';
import { useTasksCalendarId } from './useTasksCalendarId';

type ContextProps = {
  calendarRows: Date[][];
  onVisibleWhenScrollUp: (id: string) => void;
  onVisibleWhenScrollDown: (id: string) => void;
  isSecondRowOfMonth: (row: Date[]) => boolean;
  currentDate: Date;
  onNextMonth: () => void;
  onPrevMonth: () => void;
  resetMonth: () => void;
  resetCount: number;
  setMonth: (date: Date) => void;
  scrollToDate: (date: Date) => void;
};

const useValue = (): ContextProps => {
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
export const { Provider, useContext: useTasksCalendarContext } = createProvider(
  useValue,
  '@/components/organisms/Tasks/TasksCalendar/Provider.tsx',
);

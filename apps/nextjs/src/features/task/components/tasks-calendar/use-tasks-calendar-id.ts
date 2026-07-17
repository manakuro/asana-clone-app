import { formatISO } from 'date-fns';
import { useCallback } from 'react';

export const useTasksCalendarId = () => {
  const getCalendarListId = useCallback((date: Date) => {
    return `calendar-list-${formatISO(date, {
      representation: 'date',
    })}`;
  }, []);

  const getCalendarListItemId = useCallback((date: Date) => {
    return `calendar-list-item-${formatISO(date, {
      representation: 'date',
    })}`;
  }, []);

  return {
    getCalendarListId,
    getCalendarListItemId,
  };
};

import { useCallback } from 'react';
import { dateFns } from '@/shared/dateFns';

export const useTasksCalendarId = () => {
  const getCalendarListId = useCallback((date: Date) => {
    return `calendar-list-${dateFns.formatISO(date, {
      representation: 'date',
    })}`;
  }, []);

  const getCalendarListItemId = useCallback((date: Date) => {
    return `calendar-list-item-${dateFns.formatISO(date, {
      representation: 'date',
    })}`;
  }, []);

  return {
    getCalendarListId,
    getCalendarListItemId,
  };
};

import {
  endOfDay,
  format,
  formatISO,
  intervalToDuration,
  isThisWeek,
  isToday,
  isTomorrow,
  isYesterday,
} from 'date-fns';
import { isBeforeDay } from './isBeforeDay';

export const formatDueDate = (date: string): string => {
  if (!date) return '';
  const dateObj = new Date(date);

  if (isYesterday(dateObj)) return 'Yesterday';
  if (isBeforeDay(dateObj, new Date())) return format(dateObj, 'MMM d');

  if (isToday(dateObj)) return 'Today';
  if (isTomorrow(dateObj)) return 'Tomorrow';
  if (isThisWeek(dateObj)) return format(dateObj, 'EEEE');

  return format(dateObj, 'MMM d');
};

export const formatCreatedAt = (date: string): string => {
  if (!date) return '';
  const dateObj = new Date(date);
  return format(dateObj, 'MMM d');
};

export const formatDueDateInput = (date: string): string => {
  if (!date) return '';
  const dateObj = new Date(date);
  return format(dateObj, 'dd/MM/yy');
};

export const formatDueTime = (date: string): string =>
  format(new Date(date), 'H:mm aaa');

export const formatDueTimeToLocalTimezone = (date: Date): string =>
  formatISO(endOfDay(date));

export const formatDueTimeToServerTimezone = (date: Date): string => {
  const end = endOfDay(new Date(date));
  const endExcludedMilliseconds = end.setMilliseconds(0);

  return new Date(endExcludedMilliseconds).toISOString();
};

export const formatTaskFileCreatedAt = (date: string): string => {
  if (!date) return '';

  const dateObj = new Date(date);
  const day = format(dateObj, 'MMM d');
  const time = format(dateObj, 'H:mm aaa');

  return `${day}, at ${time}`;
};

export const formatFeedCreatedAt = (date: string): string => {
  if (!date) return '';

  const dateObj = new Date(date);
  const duration = intervalToDuration({
    start: new Date(),
    end: dateObj,
  });

  if (duration.days) {
    if (duration.days === 1)
      return `Yesterday at ${format(dateObj, 'H:mm aaa')}`;

    return `${duration.days} days ago`;
  }

  if (duration.hours) {
    const hour = duration.hours === 1 ? 'hour' : 'hours';
    return `${duration.hours} ${hour} ago`;
  }
  if (duration.minutes) {
    const minute = duration.minutes === 1 ? 'minute' : 'minutes';
    return `${duration.minutes} ${minute} ago`;
  }

  if (Number(duration.seconds) > 30) {
    return `${duration.seconds} seconds ago`;
  }

  return 'Just now';
};

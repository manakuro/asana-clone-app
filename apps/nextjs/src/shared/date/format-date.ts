import { dateFns } from '@/shared/date-fns';

export const formatDueDate = (date: string): string => {
  if (!date) return '';
  const dateObj = new Date(date);

  if (dateFns.isYesterday(dateObj)) return 'Yesterday';
  if (dateFns.isBeforeDay(dateObj, new Date()))
    return dateFns.format(dateObj, 'MMM d');

  if (dateFns.isToday(dateObj)) return 'Today';
  if (dateFns.isTomorrow(dateObj)) return 'Tomorrow';
  if (dateFns.isThisWeek(dateObj)) return dateFns.format(dateObj, 'EEEE');

  return dateFns.format(dateObj, 'MMM d');
};

export const formatCreatedAt = (date: string): string => {
  if (!date) return '';
  const dateObj = new Date(date);
  return dateFns.format(dateObj, 'MMM d');
};

export const formatDueDateInput = (date: string): string => {
  if (!date) return '';
  const dateObj = new Date(date);
  return dateFns.format(dateObj, 'dd/MM/yy');
};

export const formatDueTime = (date: string): string =>
  dateFns.format(new Date(date), 'H:mm aaa');

export const formatDueTimeToLocalTimezone = (date: Date): string =>
  dateFns.formatISO(dateFns.endOfDay(date));

export const formatDueTimeToServerTimezone = (date: Date): string => {
  const endOfDay = dateFns.endOfDay(new Date(date));
  const endOfDayExcludedMilliseconds = endOfDay.setMilliseconds(0);

  return new Date(endOfDayExcludedMilliseconds).toISOString();
};

export const formatTaskFileCreatedAt = (date: string): string => {
  if (!date) return '';

  const dateObj = new Date(date);
  const day = dateFns.format(dateObj, 'MMM d');
  const time = dateFns.format(dateObj, 'H:mm aaa');

  return `${day}, at ${time}`;
};

export const formatFeedCreatedAt = (date: string): string => {
  if (!date) return '';

  const dateObj = new Date(date);
  const duration = dateFns.intervalToDuration({
    start: new Date(),
    end: dateObj,
  });

  if (duration.days) {
    if (duration.days === 1)
      return `Yesterday at ${dateFns.format(dateObj, 'H:mm aaa')}`;

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

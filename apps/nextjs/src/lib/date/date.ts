import { dateFns } from '@/lib/date-fns';

export const getDifferenceInDays = (
  laterDate: ArgType<typeof dateFns.differenceInCalendarDays, 0>,
  earlierDate: ArgType<typeof dateFns.differenceInCalendarDays, 1>,
): number => {
  return dateFns.differenceInCalendarDays(laterDate, earlierDate);
};

export const isToday = (date: string) => {
  return dateFns.isToday(new Date(date));
};

export const isYesterday = (date: string) => {
  return dateFns.isYesterday(new Date(date));
};

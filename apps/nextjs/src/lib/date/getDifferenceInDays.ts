import { differenceInCalendarDays } from 'date-fns';

export const getDifferenceInDays = (
  laterDate: ArgType<typeof differenceInCalendarDays, 0>,
  earlierDate: ArgType<typeof differenceInCalendarDays, 1>,
): number => {
  return differenceInCalendarDays(laterDate, earlierDate);
};

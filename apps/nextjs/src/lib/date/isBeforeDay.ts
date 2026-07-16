import { isBefore, startOfDay } from 'date-fns';

export const isBeforeDay = (date: Date, dateToCompare: Date): boolean =>
  isBefore(startOfDay(date), startOfDay(dateToCompare));

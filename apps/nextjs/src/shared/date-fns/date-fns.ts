import DateIODateFnsAdapter from '@date-io/date-fns';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import eachMonthOfInterval from 'date-fns/eachMonthOfInterval';
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval';
import endOfISOWeek from 'date-fns/endOfISOWeek';
import endOfMonth from 'date-fns/endOfMonth';
import endOfYear from 'date-fns/endOfYear';
import formatISO from 'date-fns/formatISO';
import getWeek from 'date-fns/getWeek';
import intervalToDuration from 'date-fns/intervalToDuration';
import isFirstDayOfMonth from 'date-fns/isFirstDayOfMonth';
import isLastDayOfMonth from 'date-fns/isLastDayOfMonth';
import isPast from 'date-fns/isPast';
import isSameDay from 'date-fns/isSameDay';
import isThisWeek from 'date-fns/isThisWeek';
import isThisYear from 'date-fns/isThisYear';
import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import isYesterday from 'date-fns/isYesterday';
import startOfISOWeek from 'date-fns/startOfISOWeek';
import startOfYear from 'date-fns/startOfYear';
import subDays from 'date-fns/subDays';
import subMonths from 'date-fns/subMonths';
import subYears from 'date-fns/subYears';

class DateFnsAdapter extends DateIODateFnsAdapter {
  isToday(date: ArgType<typeof isToday, 0>) {
    return isToday(date);
  }
  isPast(date: ArgType<typeof isPast, 0>) {
    return isPast(date);
  }
  isTomorrow(date: ArgType<typeof isTomorrow, 0>) {
    return isTomorrow(date);
  }
  isYesterday(date: ArgType<typeof isYesterday, 0>) {
    return isYesterday(date);
  }
  isThisYear(date: ArgType<typeof isThisYear, 0>) {
    return isThisYear(date);
  }
  isThisWeek(date: ArgType<typeof isThisWeek, 0>) {
    return isThisWeek(date);
  }
  getWeek(
    date: ArgType<typeof getWeek, 0>,
    options: ArgType<typeof getWeek, 1>,
  ) {
    return getWeek(date, options);
  }
  addYears(
    date: ArgType<typeof addYears, 0>,
    amount: ArgType<typeof addYears, 1>,
  ) {
    return addYears(date, amount);
  }
  subYears(
    date: ArgType<typeof subYears, 0>,
    amount: ArgType<typeof subYears, 1>,
  ) {
    return subYears(date, amount);
  }
  differenceInCalendarDays(
    dateLeft: ArgType<typeof differenceInCalendarDays, 0>,
    dateRight: ArgType<typeof differenceInCalendarDays, 1>,
  ) {
    return differenceInCalendarDays(dateLeft, dateRight);
  }
  intervalToDuration(interval: ArgType<typeof intervalToDuration, 0>) {
    return intervalToDuration(interval);
  }
  subDays(
    date: ArgType<typeof subDays, 0>,
    amount: ArgType<typeof subDays, 1>,
  ) {
    return subDays(date, amount);
  }
  eachDayOfInterval(
    interval: ArgType<typeof eachDayOfInterval, 0>,
    options?: ArgType<typeof eachDayOfInterval, 1>,
  ) {
    return eachDayOfInterval(interval, options);
  }
  eachWeekOfInterval(
    interval: ArgType<typeof eachWeekOfInterval, 0>,
    options?: ArgType<typeof eachWeekOfInterval, 1>,
  ) {
    return eachWeekOfInterval(interval, options);
  }
  startOfISOWeek(date: ArgType<typeof startOfISOWeek, 0>) {
    return startOfISOWeek(date);
  }
  endOfISOWeek(date: ArgType<typeof endOfISOWeek, 0>) {
    return endOfISOWeek(date);
  }
  isFirstDayOfMonth(date: ArgType<typeof isFirstDayOfMonth, 0>) {
    return isFirstDayOfMonth(date);
  }
  isLastDayOfMonth(date: ArgType<typeof isLastDayOfMonth, 0>) {
    return isLastDayOfMonth(date);
  }
  isEndOfMonth(date: ArgType<typeof isFirstDayOfMonth, 0>) {
    const end = endOfMonth(date);
    return isSameDay(date, end);
  }
  addMonths(
    date: ArgType<typeof addMonths, 0>,
    amount: ArgType<typeof addMonths, 1>,
  ) {
    return addMonths(date, amount);
  }
  subMonths(
    date: ArgType<typeof subMonths, 0>,
    amount: ArgType<typeof subMonths, 1>,
  ) {
    return subMonths(date, amount);
  }
  formatISO(
    date: ArgType<typeof formatISO, 0>,
    options?: ArgType<typeof formatISO, 1>,
  ) {
    return formatISO(date, options);
  }
  eachMonthOfInterval(interval: ArgType<typeof eachMonthOfInterval, 0>) {
    return eachMonthOfInterval(interval);
  }
  startOfYear(date: ArgType<typeof startOfYear, 0>) {
    return startOfYear(date);
  }
  endOfYear(date: ArgType<typeof endOfYear, 0>) {
    return endOfYear(date);
  }
}

export const dateFns = new DateFnsAdapter();

import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfISOWeek,
  endOfMonth,
  startOfISOWeek,
  startOfMonth,
} from 'date-fns';

export const getCalendarMatrix = (start: Date, end: Date) => {
  const matrix = eachWeekOfInterval(
    {
      start: startOfMonth(start),
      end: endOfMonth(end),
    },
    { weekStartsOn: 1 },
  );

  return matrix.map((weekDay) =>
    eachDayOfInterval({
      start: startOfISOWeek(weekDay),
      end: endOfISOWeek(weekDay),
    }),
  );
};

import { dateFns } from '@/shared/date-fns';

export const getCalendarMatrix = (start: Date, end: Date) => {
  const matrix = dateFns.eachWeekOfInterval(
    {
      start: dateFns.startOfMonth(start),
      end: dateFns.endOfMonth(end),
    },
    { weekStartsOn: 1 },
  );

  return matrix.map((weekDay) =>
    dateFns.eachDayOfInterval({
      start: dateFns.startOfISOWeek(weekDay),
      end: dateFns.endOfISOWeek(weekDay),
    }),
  );
};

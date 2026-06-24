import { dateFns } from '@/shared/date-fns';
import type { Task } from './type';

export const sortByDueDate = (tasks: Task[]) => {
  return tasks.sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;

    return new Date(a.dueDate) < new Date(b.dueDate) ? -1 : 1;
  });
};
export const filterByDueDateInFiveDays = (tasks: Task[]) => {
  const now = new Date();
  const start = dateFns.endOfDay(now);

  return tasks.filter((t) => {
    if (!t.dueDate) return false;

    const dueDate = new Date(t.dueDate);
    if (dateFns.isPast(dueDate)) return false;

    return (
      (dateFns.intervalToDuration({
        start,
        end: dateFns.endOfDay(dueDate),
      })?.days ?? 0) <= 5
    );
  });
};
export const filterByTeammateId = (teammateId: string) => (tasks: Task[]) =>
  tasks.filter((t) => t.assigneeId === teammateId);

export const filterByDueDate = (dueDate: string) => (tasks: Task[]) =>
  tasks.filter((t) =>
    dateFns.isSameDay(new Date(t.dueDate), new Date(dueDate)),
  );

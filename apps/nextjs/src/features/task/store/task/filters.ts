import { endOfDay, intervalToDuration, isPast, isSameDay } from 'date-fns';
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
  const start = endOfDay(now);

  return tasks.filter((t) => {
    if (!t.dueDate) return false;

    const dueDate = new Date(t.dueDate);
    if (isPast(dueDate)) return false;

    return (
      (intervalToDuration({
        start,
        end: endOfDay(dueDate),
      })?.days ?? 0) <= 5
    );
  });
};
export const filterByTeammateId = (teammateId: string) => (tasks: Task[]) =>
  tasks.filter((t) => t.assigneeId === teammateId);

export const filterByDueDate = (dueDate: string) => (tasks: Task[]) =>
  tasks.filter((t) => isSameDay(new Date(t.dueDate), new Date(dueDate)));

import { format, isFirstDayOfMonth, isToday } from 'date-fns';
import { useMemo } from 'react';
import type { FlexProps } from '@/components/ui/flex';
import type { TextProps } from '@/components/ui/text';
import { useTasksContext } from '@/features/task/components/tasks-provider/tasks-context';
import { useProjectDueDate } from './use-project-due-date';

type Props = {
  dateString: string;
};

export const useListItemStyle = (props: Props) => {
  const { dateString } = props;
  const { isProjectDueDate } = useProjectDueDate({ dateString });
  const { isProjectsPage } = useTasksContext();
  const date = useMemo(() => new Date(dateString), [dateString]);

  const borderStyle = useMemo<FlexProps>(() => {
    if (isToday(date)) return { borderTopColor: 'cyan.400' };
    if (isFirstDayOfMonth(date)) return { borderTopColor: 'gray.400' };
    if (isProjectsPage && isProjectDueDate)
      return { borderTopColor: 'orange.400' };
    return {};
  }, [date, isProjectDueDate, isProjectsPage]);

  const textStyle = useMemo<TextProps>(() => {
    if (isToday(date)) return { color: 'cyan.400', fontWeight: 'bold' };
    return {};
  }, [date]);

  const dateText = useMemo(() => {
    if (isFirstDayOfMonth(date)) return format(date, 'MMMM d');
    return format(date, 'd');
  }, [date]);

  return {
    borderStyle,
    textStyle,
    dateText,
  };
};

import { useTasksContext } from '@/components/features/organisms/Tasks';
import type { FlexProps, TextProps } from '@/components/ui/atoms';
import { dateFns } from '@/shared/dateFns';
import { useMemo } from 'react';
import { useProjectDueDate } from './useProjectDueDate';

type Props = {
  dateString: string;
};

export const useListItemStyle = (props: Props) => {
  const { dateString } = props;
  const { isProjectDueDate } = useProjectDueDate({ dateString });
  const { isProjectsPage } = useTasksContext();
  const date = useMemo(() => new Date(dateString), [dateString]);

  const borderStyle = useMemo<FlexProps>(() => {
    if (dateFns.isToday(date)) return { borderTopColor: 'cyan.400' };
    if (dateFns.isFirstDayOfMonth(date)) return { borderTopColor: 'gray.400' };
    if (isProjectsPage && isProjectDueDate)
      return { borderTopColor: 'orange.400' };
    return {};
  }, [date, isProjectDueDate, isProjectsPage]);

  const textStyle = useMemo<TextProps>(() => {
    if (dateFns.isToday(date)) return { color: 'cyan.400', fontWeight: 'bold' };
    return {};
  }, [date]);

  const dateText = useMemo(() => {
    if (dateFns.isFirstDayOfMonth(date)) return dateFns.format(date, 'MMMM d');
    return dateFns.format(date, 'd');
  }, [date]);

  return {
    borderStyle,
    textStyle,
    dateText,
  };
};

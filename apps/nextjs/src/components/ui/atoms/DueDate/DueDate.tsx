import { Text, type TextProps } from '@/components/ui/atoms';
import { formatDueDate } from '@/shared/date';
import { dateFns } from '@/shared/dateFns';
import { useMemo } from 'react';

type Props = TextProps & {
  dueDate: string;
  fallback?: string;
};

export function DueDate(props: Props) {
  const { dueDate, fallback, ...rest } = props;
  const isBeforeDate = useMemo(
    () => dateFns.isBeforeDay(new Date(dueDate), new Date()),
    [dueDate],
  );
  const hadDueDate = useMemo(() => !!dueDate, [dueDate]);

  const style = useMemo<TextProps>(() => {
    return {
      ...(isBeforeDate
        ? {
            color: 'alert',
          }
        : {}),
    };
  }, [isBeforeDate]);

  return (
    <Text color="text.muted" {...style} {...rest}>
      {hadDueDate ? formatDueDate(dueDate) : fallback}
      {rest.children}
    </Text>
  );
}

import { useMemo } from 'react';
import { Text, type TextProps } from '@/components/ui/text';
import { formatDueDate } from '@/lib/date';
import { dateFns } from '@/lib/date-fns';

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
    <Text color="fg.muted" {...style} {...rest}>
      {hadDueDate ? formatDueDate(dueDate) : fallback}
      {rest.children}
    </Text>
  );
}

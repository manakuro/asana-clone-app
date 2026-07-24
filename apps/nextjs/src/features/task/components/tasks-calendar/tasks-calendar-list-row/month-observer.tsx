import { memo, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useTasksCalendarContext } from '../context';

type Props = {
  isSecondRowOfMonth: boolean;
  dateString: string;
} & FlexProps;

export const MonthObserver = memo(function MonthObserver(props: Props) {
  const { isSecondRowOfMonth, id, dateString, ...rest } = props;
  const { ref, entry } = useInView({
    skip: !isSecondRowOfMonth,
    rootMargin: '-19% 0px -79% 0px',
  });
  const isFirst = useRef(true);
  const prevTopRef = useRef<number | null>(null);
  const { onNextMonth, onPrevMonth } = useTasksCalendarContext();

  useEffect(() => {
    if (!isSecondRowOfMonth) return;
    if (!entry) return;

    const currentTop = entry.boundingClientRect.top;
    const prevTop = prevTopRef.current;
    prevTopRef.current = currentTop;

    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (prevTop === null) return;

    const scrollingDown = currentTop < prevTop;
    const scrollingUp = currentTop > prevTop;

    if (entry.isIntersecting && scrollingUp) {
      console.log('onPrevMonth!: ', id);
      onPrevMonth(dateString);
      return;
    }

    if (!entry.isIntersecting && scrollingDown) {
      console.log('onNextMonth!: ', id);
      onNextMonth(dateString);
    }
  }, [entry, id, onNextMonth, onPrevMonth, dateString, isSecondRowOfMonth]);

  return <Flex {...rest} ref={ref} flex={1} />;
});

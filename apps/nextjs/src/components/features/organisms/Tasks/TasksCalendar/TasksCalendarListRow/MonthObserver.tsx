import { Flex, type FlexProps } from '@/components/ui/atoms';
import { memo, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTasksCalendarContext } from '../Provider';

type Props = {
  isSecondRowOfMonth: boolean;
  dateString: string;
} & FlexProps;

export const MonthObserver = memo(function MonthObserver(props: Props) {
  const { isSecondRowOfMonth, id, dateString, ...rest } = props;
  const { ref, entry } = useInView({
    skip: !isSecondRowOfMonth,
  });
  const isFirst = useRef(true);
  const { onNextMonth, onPrevMonth } = useTasksCalendarContext();

  useEffect(() => {
    if (!isSecondRowOfMonth) return;

    // When scrolling down and the calendar changes to the next month
    if (
      !isFirst.current &&
      !entry?.isIntersecting &&
      entry?.intersectionRatio === 0 &&
      entry.boundingClientRect.top < 0 && // top is less than 0 when only scrolling
      entry.boundingClientRect.bottom > 0 // bottom is more than 0 when only scrolling
    ) {
      console.log('down!: ', id);
      onNextMonth();
    }

    // When scrolling up and the calendar changes to the previous month
    if (
      !isFirst.current &&
      entry?.isIntersecting &&
      entry?.intersectionRatio > 0 &&
      entry.boundingClientRect.top < 0
    ) {
      console.log('up!: ', id);
      onPrevMonth();
    }

    if (entry && isFirst.current) {
      isFirst.current = false;
    }
  }, [entry, isSecondRowOfMonth, id, onNextMonth, onPrevMonth]);

  return <Flex {...rest} ref={ref} flex={1} />;
});

import { memo, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useTasksCalendarContext } from '../context';

type Props = {
  isMonthBoundaryRow: boolean;
  dateString: string;
} & FlexProps;

export const MonthObserver = memo(function MonthObserver(props: Props) {
  const { isMonthBoundaryRow, id, dateString, ...rest } = props;
  const { ref, entry } = useInView({
    skip: !isMonthBoundaryRow,
    initialInView: false,
    // Creates a narrow 2% observation band starting at 19% from the viewport top.
    // Toggle MonthObserverDebugOverlay in tasks-calendar-list.tsx to visualize.
    rootMargin: '-19% 0px -79% 0px',
  });
  const isFirstRenderingRef = useRef(true);
  const prevTopRef = useRef<number | null>(null);
  const { onNextMonth, onPrevMonth } = useTasksCalendarContext();

  useEffect(() => {
    if (!isMonthBoundaryRow) return;
    if (!entry) return;

    const currentTop = entry.boundingClientRect.top;
    const prevTop = prevTopRef.current;
    prevTopRef.current = currentTop;

    if (isFirstRenderingRef.current) {
      isFirstRenderingRef.current = false;
      return;
    }
    if (prevTop === null) return;

    const scrollingDown = currentTop < prevTop;
    const scrollingUp = currentTop > prevTop;

    if (entry.isIntersecting && scrollingUp) {
      onPrevMonth(dateString);
      return;
    }

    if (!entry.isIntersecting && scrollingDown) {
      onNextMonth(dateString);
    }
  }, [entry, onNextMonth, onPrevMonth, dateString, isMonthBoundaryRow]);

  return <Flex {...rest} ref={ref} flex={1} />;
});

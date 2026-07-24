import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { MonthObserver } from './month-observer';
import { ScrollDownObserver } from './scroll-down-observer';
import { ScrollUpObserver } from './scroll-up-observer';

type Props = {
  observeScrollUp?: boolean;
  observeScrollDown?: boolean;
  onVisibleWhenScrollUp: (id: string) => void;
  onVisibleWhenScrollDown: (id: string) => void;
  isMonthBoundaryRow: boolean;
  dateString: string;
} & FlexProps;

export const TasksCalendarListRow = memo(function TasksCalendarListRow(
  props: Props,
) {
  const {
    observeScrollUp,
    observeScrollDown,
    onVisibleWhenScrollUp,
    onVisibleWhenScrollDown,
    isMonthBoundaryRow,
    dateString,
    ...rest
  } = props;

  return (
    <MonthObserver
      isMonthBoundaryRow={isMonthBoundaryRow}
      dateString={dateString}
      id={props.id}
    >
      <ScrollUpObserver
        observeScrollUp={observeScrollUp}
        onVisible={onVisibleWhenScrollUp}
        dateString={dateString}
      >
        <ScrollDownObserver
          observeScrollDown={observeScrollDown}
          onVisible={onVisibleWhenScrollDown}
          dateString={dateString}
        >
          <Flex marginBottom="3px" {...rest} flex={1} />
        </ScrollDownObserver>
      </ScrollUpObserver>
    </MonthObserver>
  );
});

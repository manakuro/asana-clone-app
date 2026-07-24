import { formatISO, subDays } from 'date-fns';
import { memo, useEffect } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { isHTMLElement } from '@/utils/is-html-element';
import { useTasksCalendarContext } from '../context';
import { TasksCalendarListItem } from '../tasks-calendar-list-item';
import { TasksCalendarListRow } from '../tasks-calendar-list-row';
import { useTasksCalendarId } from '../use-tasks-calendar-id';

type Props = FlexProps;

export const TasksCalendarList = memo(function TasksCalendarList(
  _props: Props,
) {
  const { getCalendarListId, getCalendarListItemId } = useTasksCalendarId();
  const {
    calendarRows,
    onVisibleWhenScrollDown,
    onVisibleWhenScrollUp,
    isSecondRowOfMonth,
    resetCount,
  } = useTasksCalendarContext();

  useEffect(() => {
    const element = document.getElementById(
      getCalendarListItemId(subDays(new Date(), 7)),
    );
    if (!isHTMLElement(element)) return;

    element.scrollIntoView();
  }, [getCalendarListItemId]);

  return (
    <Flex flex={1} flexDirection="column">
      <MonthObserverDebugOverlay />
      {calendarRows.map((r, i) => (
        <TasksCalendarListRow
          observeScrollUp={i === 10}
          observeScrollDown={i === calendarRows.length - 10}
          onVisibleWhenScrollUp={onVisibleWhenScrollUp}
          onVisibleWhenScrollDown={onVisibleWhenScrollDown}
          isSecondRowOfMonth={isSecondRowOfMonth(r)}
          key={`${getCalendarListId(r[0])}-${resetCount}`}
          id={getCalendarListId(r[0])}
          dateString={formatISO(r[0], { representation: 'date' })}
        >
          {r.map((date) => (
            <TasksCalendarListItem
              key={getCalendarListItemId(date)}
              id={getCalendarListItemId(date)}
              dateString={formatISO(date, { representation: 'date' })}
            />
          ))}
        </TasksCalendarListRow>
      ))}
    </Flex>
  );
});

function MonthObserverDebugOverlay() {
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: '19%',
        bottom: '79%',
        background: 'rgba(255, 0, 0, 0.2)',
        borderTop: '1px solid red',
        borderBottom: '1px solid red',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}

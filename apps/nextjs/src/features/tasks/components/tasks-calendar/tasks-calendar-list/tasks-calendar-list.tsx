import { memo, useEffect } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { dateFns } from '@/lib/date-fns';
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
      getCalendarListItemId(dateFns.subDays(new Date(), 7)),
    );
    if (!isHTMLElement(element)) return;

    element.scrollIntoView();
  }, [getCalendarListItemId]);

  return (
    <Flex flex={1} flexDirection="column">
      {calendarRows.map((r, i) => (
        <TasksCalendarListRow
          observeScrollUp={i === 10}
          observeScrollDown={i === calendarRows.length - 10}
          onVisibleWhenScrollUp={onVisibleWhenScrollUp}
          onVisibleWhenScrollDown={onVisibleWhenScrollDown}
          isSecondRowOfMonth={isSecondRowOfMonth(r)}
          key={`${getCalendarListId(r[0])}-${resetCount}`}
          id={getCalendarListId(r[0])}
          dateString={dateFns.formatISO(r[0], { representation: 'date' })}
        >
          {r.map((date) => (
            <TasksCalendarListItem
              key={getCalendarListItemId(date)}
              id={getCalendarListItemId(date)}
              dateString={dateFns.formatISO(date, { representation: 'date' })}
            />
          ))}
        </TasksCalendarListRow>
      ))}
    </Flex>
  );
});

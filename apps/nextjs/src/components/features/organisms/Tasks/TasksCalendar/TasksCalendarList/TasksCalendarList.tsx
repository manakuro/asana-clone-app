import { Flex, type FlexProps } from '@/components/ui/atoms';
import { dateFns } from '@/shared/dateFns';
import { isHTMLElement } from '@/shared/isHTMLElement';
import { memo, useEffect } from 'react';
import { useTasksCalendarContext } from '../Provider';
import { TasksCalendarListItem } from '../TasksCalendarListItem';
import { TasksCalendarListRow } from '../TasksCalendarListRow';
import { useTasksCalendarId } from '../useTasksCalendarId';

type Props = FlexProps;

export const TasksCalendarList = memo(function TasksCalendarList(props: Props) {
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

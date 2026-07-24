import { formatISO, subDays } from 'date-fns';
import { atom, useAtom } from 'jotai';
import { memo, useEffect } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Switch } from '@/components/ui/switch';
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
    loadPastMonths,
    loadFutureMonths,
    isMonthBoundaryRow,
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
          onVisibleWhenScrollUp={loadPastMonths}
          onVisibleWhenScrollDown={loadFutureMonths}
          isMonthBoundaryRow={isMonthBoundaryRow(r)}
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

/**
 * Development-only overlay that visualizes the IntersectionObserver's
 * rootMargin zone used by MonthObserver. The red band shows where month
 * boundary rows must intersect to trigger onPrevMonth/onNextMonth.
 *
 * IMPORTANT: top="19%" and bottom="79%" must match the rootMargin values
 * in month-observer.tsx ('-19% 0px -79% 0px').
 */
const debugState = atom<boolean>(false);
function MonthObserverDebugOverlay() {
  const [debug, setDebug] = useAtom(debugState);

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <>
      <Flex position="fixed" top="78px" right="150px" zIndex={9999} padding={2}>
        <Switch.Root
          size="sm"
          checked={debug}
          onCheckedChange={(e) => setDebug(e.checked)}
        >
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>Activate month observer line (debug mode)</Switch.Label>
        </Switch.Root>
      </Flex>
      {debug && (
        <Flex
          position="fixed"
          left={0}
          right={0}
          top="19%"
          bottom="79%"
          background="rgba(255, 0, 0, 0.2)"
          borderTop="1px solid red"
          borderBottom="1px solid red"
          pointerEvents="none"
          zIndex={9999}
        />
      )}
    </>
  );
}

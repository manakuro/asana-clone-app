import {
  ROUTE_MY_TASKS,
  ROUTE_MY_TASKS_BOARD,
  ROUTE_MY_TASKS_CALENDAR,
  ROUTE_MY_TASKS_FILES,
  ROUTE_MY_TASKS_LIST,
} from '@/router';
import { useTeammateTaskTabStatus } from '@/store/entities/teammateTaskTabStatus';
import { usePathname } from 'next/navigation';
import { memo, useMemo } from 'react';
import { NavListItem } from '../../NavListItem';
import type { NavListItem as TNavListItem } from '../../type';

export const MyTasks = memo(function MyTasks() {
  const pathname = usePathname();
  const { isTabStatus } = useTeammateTaskTabStatus();
  const href = useMemo(() => {
    switch (true) {
      case isTabStatus('List'):
        return ROUTE_MY_TASKS_LIST.href.pathname();
      case isTabStatus('Board'):
        return ROUTE_MY_TASKS_BOARD.href.pathname();
      case isTabStatus('Calendar'):
        return ROUTE_MY_TASKS_CALENDAR.href.pathname();
      case isTabStatus('Files'):
        return ROUTE_MY_TASKS_FILES.href.pathname();
      default:
        return ROUTE_MY_TASKS_LIST.href.pathname();
    }
  }, [isTabStatus]);

  const item = useMemo<TNavListItem>(
    () => ({
      name: 'My Tasks',
      href: href,
      icon: 'checkCircle',
      isCurrentRoute: () => {
        return pathname?.includes(ROUTE_MY_TASKS.href.pathname()) ?? false;
      },
    }),
    [pathname, href],
  );

  return <NavListItem item={item} />;
});

import { ROUTE_GOALS } from '@/router';
import { usePathname } from 'next/navigation';
import { memo, useMemo } from 'react';
import { NavListItem } from '../../NavListItem';
import type { NavListItem as TNavListItem } from '../../type';

export const Goals = memo(function Goals() {
  const pathname = usePathname();

  const item = useMemo<TNavListItem>(
    () => ({
      name: 'Goals',
      href: ROUTE_GOALS.href.pathname(),
      icon: 'rocket',
      isCurrentRoute: () => pathname === ROUTE_GOALS.href.pathname(),
    }),
    [pathname],
  );

  return <NavListItem item={item} disabled />;
});

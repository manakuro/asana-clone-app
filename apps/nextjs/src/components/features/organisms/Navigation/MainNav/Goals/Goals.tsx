import { ROUTE_GOALS } from '@/router';
import { useRouter } from 'next/router';
import { memo, useMemo } from 'react';
import { NavListItem } from '../../NavListItem';
import type { NavListItem as TNavListItem } from '../../type';

export const Goals = memo(function Goals() {
  const router = useRouter();

  const item = useMemo<TNavListItem>(
    () => ({
      name: 'Goals',
      href: ROUTE_GOALS.href.pathname(),
      icon: 'rocket',
      isCurrentRoute: () => router.pathname === ROUTE_GOALS.href.pathname(),
    }),
    [router.pathname],
  );

  return <NavListItem item={item} disabled />;
});

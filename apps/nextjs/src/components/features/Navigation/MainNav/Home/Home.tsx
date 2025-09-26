import { ROUTE_HOME } from '@/router';
import { usePathname } from 'next/navigation';
import { memo, useMemo } from 'react';
import { NavListItem } from '../../NavListItem';
import type { NavListItem as TNavListItem } from '../../type';

export const Home = memo(function Home() {
  const pathname = usePathname();

  const item = useMemo<TNavListItem>(
    () => ({
      name: 'Home',
      href: ROUTE_HOME.href.pathname(),
      icon: 'home',
      isCurrentRoute: () => pathname === ROUTE_HOME.href.pathname(),
    }),
    [pathname],
  );

  return <NavListItem item={item} />;
});

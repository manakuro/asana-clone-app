import { ROUTE_PORTFOLIOS } from '@/router';
import { usePathname } from 'next/navigation';
import { memo, useMemo } from 'react';
import { NavListItem } from '../../NavListItem';
import type { NavListItem as TNavListItem } from '../../type';

export const Portfolios = memo(function Portfolios() {
  const pathname = usePathname();

  const item = useMemo<TNavListItem>(
    () => ({
      name: 'Portfolios',
      href: ROUTE_PORTFOLIOS.href.pathname(),
      icon: 'barChart',
      isCurrentRoute: () => pathname === ROUTE_PORTFOLIOS.href.pathname(),
    }),
    [pathname],
  );

  return <NavListItem item={item} disabled />;
});

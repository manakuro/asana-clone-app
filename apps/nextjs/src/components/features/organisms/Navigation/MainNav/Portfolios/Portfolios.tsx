import { ROUTE_PORTFOLIOS } from '@/router';
import { useRouter } from 'next/router';
import { memo, useMemo } from 'react';
import { NavListItem } from '../../NavListItem';
import type { NavListItem as TNavListItem } from '../../type';

export const Portfolios = memo(function Portfolios() {
  const router = useRouter();

  const item = useMemo<TNavListItem>(
    () => ({
      name: 'Portfolios',
      href: ROUTE_PORTFOLIOS.href.pathname(),
      icon: 'barChart',
      isCurrentRoute: () =>
        router.pathname === ROUTE_PORTFOLIOS.href.pathname(),
    }),
    [router.pathname],
  );

  return <NavListItem item={item} disabled />;
});

import { useRouter } from 'next/router';
import type React from 'react';
import { memo, useMemo } from 'react';
import { ROUTE_PORTFOLIOS } from 'src/router';
import { NavListItem } from '../../NavListItem';
import type { NavListItem as TNavListItem } from '../../type';

export const Portfolios: React.FC = memo(() => {
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
Portfolios.displayName = 'Portfolios';

import { memo, useMemo } from 'react';
import { NavListItem } from '../../nav-list-item';
import type { NavListItem as TNavListItem } from '../../type';

export const Portfolios = memo(function Portfolios() {
  const item = useMemo<TNavListItem>(
    () => ({
      name: 'Portfolios',
      href: '/',
      icon: 'barChart',
      isCurrentRoute: () => false,
    }),
    [],
  );

  return <NavListItem item={item} disabled />;
});

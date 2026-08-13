import { memo, useMemo } from 'react';
import { NavListItem } from '../../nav-list-item';
import type { NavListItem as TNavListItem } from '../../type';

export const Goals = memo(function Goals() {
  const item = useMemo<TNavListItem>(
    () => ({
      name: 'Goals',
      href: '/',
      icon: 'rocket',
      isCurrentRoute: () => false,
    }),
    [],
  );

  return <NavListItem item={item} disabled />;
});

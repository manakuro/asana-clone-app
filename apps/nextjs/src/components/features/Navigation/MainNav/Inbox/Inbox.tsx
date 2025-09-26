import { ROUTE_INBOX } from '@/router';
import { usePathname } from 'next/navigation';
import { memo, useMemo } from 'react';
import { NavListItem } from '../../NavListItem';
import type { NavListItem as TNavListItem } from '../../type';

export const Inbox = memo(function Inbox() {
  const pathname = usePathname();

  const item = useMemo<TNavListItem>(
    () => ({
      name: 'Inbox',
      href: ROUTE_INBOX.href.pathname(),
      icon: 'bell',
      isCurrentRoute: () =>
        pathname?.includes(ROUTE_INBOX.href.pathname()) ?? false,
    }),
    [pathname],
  );

  return <NavListItem item={item} />;
});

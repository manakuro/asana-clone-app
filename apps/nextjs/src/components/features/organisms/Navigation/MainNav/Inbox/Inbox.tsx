import { ROUTE_INBOX } from '@/router';
import { useRouter } from 'next/router';
import { memo, useMemo } from 'react';
import { NavListItem } from '../../NavListItem';
import type { NavListItem as TNavListItem } from '../../type';

export const Inbox = memo(function Inbox() {
  const router = useRouter();

  const item = useMemo<TNavListItem>(
    () => ({
      name: 'Inbox',
      href: ROUTE_INBOX.href.pathname(),
      icon: 'bell',
      isCurrentRoute: () =>
        router.pathname.includes(ROUTE_INBOX.href.pathname()),
    }),
    [router.pathname],
  );

  return <NavListItem item={item} />;
});

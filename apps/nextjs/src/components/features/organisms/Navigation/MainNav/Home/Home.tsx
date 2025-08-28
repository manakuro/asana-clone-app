import { ROUTE_HOME } from '@/router';
import { useRouter } from 'next/router';
import type React from 'react';
import { memo, useMemo } from 'react';
import { NavListItem } from '../../NavListItem';
import type { NavListItem as TNavListItem } from '../../type';

export const Home: React.FC = memo(() => {
  const router = useRouter();

  const item = useMemo<TNavListItem>(
    () => ({
      name: 'Home',
      href: ROUTE_HOME.href.pathname(),
      icon: 'home',
      isCurrentRoute: () => router.asPath === ROUTE_HOME.href.pathname(),
    }),
    [router.asPath],
  );

  return <NavListItem item={item} />;
});

import {
  type DynamicRoutes,
  type StaticRoutes,
  convertPathnameObjToPathname,
  routes,
} from '@/router';
import Link, { type LinkProps } from 'next/link';
import { type PropsWithChildren, memo, useMemo } from 'react';

type Props = PropsWithChildren<
  Omit<LinkProps, 'href'> & {
    href: StaticRoutes | DynamicRoutes;
  }
>;

export const NextLink = memo(function NextLink(props: Props) {
  const href = useMemo(() => {
    return typeof props.href === 'object'
      ? convertPathnameObjToPathname(props.href)
      : props.href;
  }, [props.href]);

  const route = useMemo(() => routes.find((r) => r.regex.test(href)), [href]);

  if (!route) {
    console.error('There is no link: ', props.href);
  }

  return <Link {...props} href={href} />;
});

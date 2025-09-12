export const ROUTE_HOME = {
  regex: /^\/$/iu,
  href: {
    pathname: () => '/' as const,
  },
  query: 'home',
} as const;

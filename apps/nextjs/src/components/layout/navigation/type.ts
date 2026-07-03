import type { StaticRoutes } from '@/router';
import type { IconType } from '@/utils/icons';

export type NavListItem = {
  name: string;
  icon: IconType;
  isCurrentRoute?: () => boolean;
} & (
  | {
      href: StaticRoutes;
      isExternal?: false | undefined | null;
    }
  | {
      href: string;
      isExternal?: true;
    }
);

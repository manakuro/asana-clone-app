import { NavListItem } from '@/components/features/organisms/Navigation/NavListItem';
import type { NavListItem as TNavListItem } from '@/components/features/organisms/Navigation/type';
import { List } from '@/components/ui/atoms';

const items: TNavListItem[] = [
  {
    name: 'Help with features',
    href: 'https://google.com',
    icon: 'bookOpen',
    isExternal: true,
  },
  {
    name: 'Contact support',
    href: 'https://google.com',
    icon: 'help',
    isExternal: true,
  },
  {
    name: 'Apps and integrations',
    href: 'https://google.com',
    icon: 'layerPlus',
    isExternal: true,
  },
  {
    name: 'Keyboard shortcuts',
    href: 'https://google.com',
    icon: 'gridHorizontal',
    isExternal: true,
  },
  {
    name: 'Download mobile app',
    href: 'https://google.com',
    icon: 'mobile',
    isExternal: true,
  },
];

export function Footer() {
  return (
    <List w="full" mb={3}>
      {items.map((n) => (
        <NavListItem key={n.name} item={n} />
      ))}
    </List>
  );
}

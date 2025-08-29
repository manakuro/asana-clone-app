import { NavListItem } from '@/components/features/organisms/Navigation/NavListItem';
import type { NavListItem as TNavListItem } from '@/components/features/organisms/Navigation/type';
import { List } from '@/components/ui/atoms';

const items: TNavListItem[] = [
  {
    name: 'Video Tutorials',
    href: 'https://google.com',
    icon: 'playCircleOutline',
    isExternal: true,
  },
  {
    name: 'Training webinars',
    href: 'https://google.com',
    icon: 'movie',
    isExternal: true,
  },
  {
    name: 'Use case example',
    href: 'https://google.com',
    icon: 'shapePolygon',
    isExternal: true,
  },
];
export function Detail() {
  return (
    <>
      <List w="full">
        {items.map((n) => (
          <NavListItem
            key={n.name}
            item={n}
            light
            linkStyle={{
              borderRadius: 'md',
            }}
          />
        ))}
      </List>
    </>
  );
}

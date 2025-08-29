import { HELP_CONTAINER_PADDING } from '@/components/features/organisms/Navigation/Help';
import { Stack } from '@/components/ui/atoms';
import { type PropsWithChildren, useCallback, useState } from 'react';
import { guide1Item } from './Guide1';
import { guide2Item } from './Guide2';
import { guide3Item } from './Guide3';
import { guide4Item } from './Guide4';
import { GuideListItem, type Item } from './GuideListItem';

const items: Item[] = [guide1Item, guide2Item, guide3Item, guide4Item];

export function Body(props: PropsWithChildren) {
  const [state, setState] = useState<{ id: number; isOpen: boolean }[]>(
    items.map((i) => ({ id: i.id, isOpen: false })),
  );
  const handleToggle = useCallback((id: number) => {
    setState((prev) => {
      const current = prev.find((p) => p.isOpen);
      // Close the list item that is opened.
      if (current?.isOpen && current?.id === id)
        return prev.map((p) => ({ ...p, isOpen: false }));

      return prev.map((p) => ({ ...p, isOpen: p.id === id }));
    });
  }, []);

  return (
    <Stack
      w="full"
      spacing={4}
      mb={40}
      flex={1}
      p={HELP_CONTAINER_PADDING}
      {...props}
    >
      {items.map((item, i) => (
        <GuideListItem
          key={item.id}
          item={item}
          nextItem={items[i + 1]}
          isOpen={state.find((s) => s.id === item.id)?.isOpen ?? false}
          onToggle={handleToggle}
        />
      ))}
    </Stack>
  );
}

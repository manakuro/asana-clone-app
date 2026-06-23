import { type PropsWithChildren, useCallback, useState } from 'react';
import { HELP_CONTAINER_PADDING } from '@/components/features/navigation/help';
import { Stack } from '@/components/ui/stack';
import { GuideListItem, type Item } from './guide-list-item';
import { guide1Item } from './guide1';
import { guide2Item } from './guide2';
import { guide3Item } from './guide3';
import { guide4Item } from './guide4';

const items: Item[] = [guide1Item, guide2Item, guide3Item, guide4Item];

export function Body(props: PropsWithChildren) {
  const [state, setState] = useState<{ id: number; open: boolean }[]>(
    items.map((i) => ({ id: i.id, open: false })),
  );
  const handleToggle = useCallback((id: number) => {
    setState((prev) => {
      const current = prev.find((p) => p.open);
      // Close the list item that is opened.
      if (current?.open && current?.id === id)
        return prev.map((p) => ({ ...p, open: false }));

      return prev.map((p) => ({ ...p, open: p.id === id }));
    });
  }, []);

  return (
    <Stack
      w="full"
      gap={4}
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
          open={state.find((s) => s.id === item.id)?.open ?? false}
          onToggle={handleToggle}
        />
      ))}
    </Stack>
  );
}

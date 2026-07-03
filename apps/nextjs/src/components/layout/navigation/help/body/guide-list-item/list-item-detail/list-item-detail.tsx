import type React from 'react';
import type { Item } from '@/components/layout/navigation/help/body/guide-list-item';
import { Flex } from '@/components/ui/flex';
import { LightMode } from '@/lib/chakra-ui/generated/color-mode';
import { Background } from './background';
import { Detail } from './detail';
import { Header } from './header';

type Props = {
  item: Item;
  onToggle: (id: number) => void;
  seeMoreComponent: React.ReactNode;
  nextItem?: Item;
};

export function ListItemDetail(props: Props) {
  const { item, onToggle, nextItem, seeMoreComponent } = props;

  return (
    <LightMode>
      <Flex
        flexDirection="column"
        borderRadius="md"
        minH="340px"
        bg="help.guide.bg"
      >
        <Header item={item} onToggle={onToggle} />
        <Background src={item.src} />
        <Detail
          item={item}
          onToggle={onToggle}
          seeMoreComponent={seeMoreComponent}
          nextItem={nextItem}
        />
      </Flex>
    </LightMode>
  );
}

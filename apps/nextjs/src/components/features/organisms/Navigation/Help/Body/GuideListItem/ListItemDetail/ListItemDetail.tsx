import type { Item } from '@/components/features/organisms/Navigation/Help/Body/GuideListItem';
import { Flex } from '@/components/ui/atoms';
import type React from 'react';
import { Background } from './Background';
import { Detail } from './Detail';
import { Header } from './Header';

type Props = {
  item: Item;
  onToggle: (id: number) => void;
  seeMoreComponent: React.ReactNode;
  nextItem?: Item;
};

export function ListItemDetail(props: Props) {
  const { item, onToggle, nextItem, seeMoreComponent } = props;

  return (
    <Flex
      flexDirection="column"
      borderRadius="md"
      minH="340px"
      color="gray.700"
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
  );
}

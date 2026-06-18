import { useCallback } from 'react';
import {
  type Item,
  PADDING_X,
} from '@/components/features/Navigation/Help/Body/GuideListItem';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

type Props = {
  item: Item;
  onToggle: (id: number) => void;
};

export function Header(props: Props) {
  const { item, onToggle } = props;

  const handleToggle = useCallback(() => {
    onToggle(item.id);
  }, [item.id, onToggle]);

  return (
    <Flex
      w="full"
      px={PADDING_X}
      py={2}
      onClick={handleToggle}
      cursor="pointer"
    >
      <Flex
        borderRadius="50%"
        bg="gray.800"
        justifyContent="center"
        alignItems="center"
        w="20px"
        h="20px"
        mr={PADDING_X}
        fontSize="xs"
        fontWeight="bold"
        color="white"
      >
        {item.number}
      </Flex>
      <Text fontSize="sm" fontWeight="bold" flex={1}>
        {item.title}
      </Text>
      <Icon icon="chevronDown" />
    </Flex>
  );
}

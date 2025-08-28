import {
  type Item,
  PADDING_X,
} from '@/components/features/organisms/Navigation/Help/Body/GuideListItem';
import { Flex, Icon, Text } from '@/components/ui/atoms';
import { useCallback } from 'react';

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

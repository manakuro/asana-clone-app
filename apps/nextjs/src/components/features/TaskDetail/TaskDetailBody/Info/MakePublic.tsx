import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

export function MakePublic() {
  return (
    <Flex
      h="44px"
      maxH="44px"
      px={6}
      py={2}
      bg="gray.50"
      alignItems="center"
      fontSize="sm"
    >
      <Icon icon="lockAlt" color="fg.muted" />
      <Text fontSize="sm" flex={1} ml={2}>
        This task is visible to its collaborators and members to My workspace
      </Text>
      {/*<Button size="sm" variant="ghost">*/}
      {/*  Make public*/}
      {/*</Button>*/}
    </Flex>
  );
}

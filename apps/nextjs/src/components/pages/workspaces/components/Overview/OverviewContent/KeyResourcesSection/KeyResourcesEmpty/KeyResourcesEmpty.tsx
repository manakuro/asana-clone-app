import { ComingSoonTooltip } from '@/components/features/Tooltips';
import { Button } from '@/components/ui/Button';
import { Flex } from '@/components/ui/Flex';
import { Heading } from '@/components/ui/Heading';
import { Image } from '@/components/ui/Image';
import { Stack } from '@/components/ui/Stack';

export function KeyResourcesEmpty() {
  return (
    <Flex
      flex={1}
      mt={2}
      border="1px"
      borderStyle="solid"
      borderColor="gray.200"
      borderRadius="md"
      p={4}
      alignItems="center"
      justifyContent="center"
    >
      <Flex minW="160px" minH="160px" w="160px" h="160px">
        <Image w="full" src="/images/key_resources_2.svg" />
      </Flex>
      <Flex ml={4} flexDirection="column">
        <Heading as="h6" size="xs">
          Align your team around a shared vision with a project brief and
          supporting resources.
        </Heading>
        <Stack mt={2} spacing={2} direction="row">
          <ComingSoonTooltip>
            <Button colorScheme="teal" size="sm">
              Create project brief
            </Button>
          </ComingSoonTooltip>
          <ComingSoonTooltip>
            <Button variant="outline" size="sm">
              Add links & files
            </Button>
          </ComingSoonTooltip>
        </Stack>
      </Flex>
    </Flex>
  );
}

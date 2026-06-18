import NextImage from 'next/image';
import image from '@/assets/images/key_resources_2.svg';
import { ComingSoonTooltip } from '@/components/features/Tooltips';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Stack } from '@/components/ui/stack';

export function KeyResourcesEmpty() {
  return (
    <Flex
      flex={1}
      mt={2}
      border="1px"
      borderStyle="solid"
      borderColor="border"
      borderRadius="md"
      p={4}
      alignItems="center"
      justifyContent="center"
    >
      <Flex minW="160px" minH="160px" w="160px" h="160px">
        <Image w="full" asChild>
          <NextImage src={image} alt="Picture of the key resources" />
        </Image>
      </Flex>
      <Flex ml={4} flexDirection="column">
        <Heading as="h6" size="xs">
          Align your team around a shared vision with a project brief and
          supporting resources.
        </Heading>
        <Stack mt={2} gap={2} direction="row">
          <ComingSoonTooltip>
            <Button colorPalette="teal" size="sm">
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

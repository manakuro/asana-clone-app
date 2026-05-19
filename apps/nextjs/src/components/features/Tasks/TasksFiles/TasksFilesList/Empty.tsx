import NextImage from 'next/image';
import { memo } from 'react';
import { Flex } from '@/components/ui/Flex';
import { Image } from '@/components/ui/Image';
import { Stack } from '@/components/ui/Stack';
import { Text } from '@/components/ui/Text';

export const Empty = memo(function Empty() {
  return (
    <Flex flex={1} pb={4}>
      <Stack maxW="50%" mx="auto" gap={8}>
        <Flex justifyContent="center" alignItems="center">
          <Image asChild>
            <NextImage
              width={300}
              height={212.5}
              src="/images/key_resources_1.svg"
              alt="Picture of empty files"
            />
          </Image>
        </Flex>
        <Text>
          All attachments to tasks & messages in this project will appear here
        </Text>
      </Stack>
    </Flex>
  );
});

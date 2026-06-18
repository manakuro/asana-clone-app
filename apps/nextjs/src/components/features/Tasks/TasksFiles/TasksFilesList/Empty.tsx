import NextImage from 'next/image';
import { memo } from 'react';
import emtpyImage from '@/assets/images/key_resources_1.svg';
import { Flex } from '@/components/ui/flex';
import { Image } from '@/components/ui/image';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';

export const Empty = memo(function Empty() {
  return (
    <Flex flex={1} pb={4}>
      <Stack maxW="50%" mx="auto" gap={8}>
        <Flex justifyContent="center" alignItems="center">
          <Image asChild w="300px">
            <NextImage src={emtpyImage} alt="Picture of empty files" />
          </Image>
        </Flex>
        <Text>
          All attachments to tasks & messages in this project will appear here
        </Text>
      </Stack>
    </Flex>
  );
});

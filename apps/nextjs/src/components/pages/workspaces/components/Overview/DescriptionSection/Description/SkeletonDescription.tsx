import { Flex } from '@/components/ui/Flex';
import { Skeleton } from '@/components/ui/Skeleton';
import { Stack } from '@/components/ui/Stack';
import { memo } from 'react';

export const SkeletonDescription = memo(function SkeletonDescription() {
  return (
    <Flex
      position="absolute"
      top={0}
      left={0}
      w="full"
      h="full"
      bg="white"
      zIndex={1}
    >
      <Stack spacing={4} flex={1}>
        <Skeleton h="16px" w="full" borderRadius="full" />
        <Skeleton h="16px" w="70%" borderRadius="full" />
        <Skeleton h="16px" w="60%" borderRadius="full" />
        <Skeleton h="16px" w="40%" borderRadius="full" />
      </Stack>
    </Flex>
  );
});

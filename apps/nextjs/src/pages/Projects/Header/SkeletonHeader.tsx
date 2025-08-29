import { Flex, Skeleton, Stack } from '@/components/ui/atoms';
import { memo } from 'react';

export const SkeletonHeader = memo(function SkeletonHeader() {
  return (
    <Flex flex={1}>
      <Flex alignItems="center">
        <Skeleton w="48px" h="48px" borderRadius="full" />
      </Flex>
      <Flex ml={4} mt={3} flex={1}>
        <Flex alignItems="flex-start" flexDirection="column" pt={1}>
          <Flex alignItems="center">
            <Skeleton w="100px" h="16px" borderRadius="full" />
          </Flex>
          <Stack direction="row" spacing={2} mt={3}>
            <Skeleton w="53px" h="16px" borderRadius="full" />
            <Skeleton w="53px" h="16px" borderRadius="full" />
            <Skeleton w="33px" h="16px" borderRadius="full" />
            <Skeleton w="43px" h="16px" borderRadius="full" />
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
});

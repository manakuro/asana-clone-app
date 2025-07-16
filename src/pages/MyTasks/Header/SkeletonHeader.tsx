import type React from 'react';
import { memo } from 'react';
import { Flex, Skeleton, Stack } from 'src/components/ui/atoms';

export const SkeletonHeader: React.FC = memo(() => {
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
SkeletonHeader.displayName = 'SkeletonHeader';

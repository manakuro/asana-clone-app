import { memo } from 'react';
import { Box } from '@/components/ui/box';
import { Flex } from '@/components/ui/flex';
import { Skeleton } from '@/components/ui/skeleton';
import { Stack } from '@/components/ui/stack';

const TEXT_HEIGHT = '16px';
export const SkeletonHome = memo(function SkeletonHome() {
  return (
    <Box w="840px" mx="auto" py={10}>
      <Stack gap={10}>
        <Flex flex={1} flexDirection="column">
          <Flex
            h="37px"
            py={1}
            px={2}
            borderBottom="1px"
            borderColor="border"
            borderStyle="solid"
          />
          <Stack gap={4} py={4}>
            <Skeleton h={TEXT_HEIGHT} w="80%" borderRadius="full" />
            <Skeleton h={TEXT_HEIGHT} w="60%" borderRadius="full" />
            <Skeleton h={TEXT_HEIGHT} w="50%" borderRadius="full" />
            <Skeleton h={TEXT_HEIGHT} w="70%" borderRadius="full" />
            <Skeleton h={TEXT_HEIGHT} w="40%" borderRadius="full" />
            <Skeleton h={TEXT_HEIGHT} w="80%" borderRadius="full" />
            <Skeleton h={TEXT_HEIGHT} w="60%" borderRadius="full" />
            <Skeleton h={TEXT_HEIGHT} w="50%" borderRadius="full" />
            <Skeleton h={TEXT_HEIGHT} w="70%" borderRadius="full" />
            <Skeleton h={TEXT_HEIGHT} w="40%" borderRadius="full" />
          </Stack>
        </Flex>
        <Flex flex={1} flexDirection="column">
          <Flex
            h="37px"
            py={1}
            px={2}
            borderBottom="1px"
            borderColor="border"
            borderStyle="solid"
          />
          <Box py={4}>
            <Stack direction="row" gap={6}>
              <Skeleton borderRadius="3xl" w="120px" h="120px" pt={4} />
              <Skeleton borderRadius="3xl" w="120px" h="120px" pt={4} />
            </Stack>
          </Box>
        </Flex>
        <Flex flex={1} flexDirection="column">
          <Flex
            h="37px"
            py={1}
            px={2}
            borderBottom="1px"
            borderColor="border"
          />
          <Box py={4}>
            <Stack direction="row" gap={6}>
              <Skeleton borderRadius="3xl" w="120px" h="120px" pt={4} />
              <Skeleton borderRadius="3xl" w="120px" h="120px" pt={4} />
            </Stack>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
});

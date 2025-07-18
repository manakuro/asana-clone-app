import type React from 'react';
import { memo } from 'react';
import { Box, Flex, Skeleton, Stack } from 'src/components/ui/atoms';

const TEXT_HEIGHT = '16px';
export const SkeletonHome: React.FC = memo(() => {
  return (
    <Box w="840px" mx="auto" py={10}>
      <Stack spacing={10}>
        <Flex flex={1} flexDirection="column">
          <Flex
            h="37px"
            py={1}
            px={2}
            borderBottom="1px"
            borderColor="gray.200"
          />
          <Stack spacing={4} py={4}>
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
            borderColor="gray.200"
          />
          <Box py={4}>
            <Stack direction="row" spacing={6}>
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
            borderColor="gray.200"
          />
          <Box py={4}>
            <Stack direction="row" spacing={6}>
              <Skeleton borderRadius="3xl" w="120px" h="120px" pt={4} />
              <Skeleton borderRadius="3xl" w="120px" h="120px" pt={4} />
            </Stack>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
});
SkeletonHome.displayName = 'SkeletonHome';

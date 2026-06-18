import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Skeleton } from '@/components/ui/Skeleton';
import { Stack } from '@/components/ui/Stack';
import { useBreakpointValue } from '@/shared/chakra';

type Props = FlexProps;

export const SkeletonFiles = memo(function SkeletonFiles(props: Props) {
  const splitNum = useBreakpointValue({ base: 2, '2xl': 3 }) as number;

  return (
    <Flex flex={1} h="full" flexDirection="column" bg="gray.50" {...props}>
      <Flex flex={1} p={8} pb={0}>
        <Stack maxW="90%" mx="auto" direction="row" gap={8}>
          {[...new Array(splitNum)]
            .map((_, i) => i + 1)
            .map((v) => (
              <Stack gap={8} key={v}>
                <Flex flexDirection="column" w="420px">
                  <Stack gap={8}>
                    <Skeleton h="120px" w="full" borderRadius="md" />
                    <Skeleton h="71px" w="full" borderRadius="md" />
                  </Stack>
                </Flex>
              </Stack>
            ))}
        </Stack>
      </Flex>
    </Flex>
  );
});

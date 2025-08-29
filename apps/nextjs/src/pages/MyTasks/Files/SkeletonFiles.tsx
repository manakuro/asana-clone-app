import { Flex, type FlexProps, Skeleton, Stack } from '@/components/ui/atoms';
import { useBreakpointValue } from '@/shared/chakra';
import { memo } from 'react';

type Props = FlexProps;

export const SkeletonFiles = memo(function SkeletonFiles(props: Props) {
  const splitNum = useBreakpointValue({ base: 2, '2xl': 3 }) as number;

  return (
    <Flex flex={1} h="full" flexDirection="column" bg="gray.50" {...props}>
      <Flex flex={1} p={8} pb={0}>
        <Stack maxW="90%" mx="auto" direction="row" spacing={8}>
          {[...new Array(splitNum)]
            .map((_, i) => i + 1)
            .map((v) => (
              <Stack spacing={8} key={v}>
                <Flex flexDirection="column" w="420px">
                  <Stack spacing={8}>
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

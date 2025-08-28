import { Flex, type FlexProps, Skeleton, Stack } from '@/components/ui/atoms';

type Props = FlexProps;

export function SkeletonTaskDetailBody(props: Props) {
  return (
    <Flex flexDirection="column" flex={1} {...props}>
      <Skeleton h="44px" />

      <Stack direction="column" spacing={4} mt={4} px={6}>
        <Skeleton h="16px" w="60%" borderRadius="full" />
        <Skeleton h="16px" w="50%" borderRadius="full" />
        <Skeleton h="16px" w="40%" borderRadius="full" />
        <Skeleton h="16px" w="45%" borderRadius="full" />
      </Stack>
    </Flex>
  );
}

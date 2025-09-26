import { Flex, type FlexProps } from '@/components/ui/Flex';

type Props = FlexProps;

export function OverviewSectionHeader(props: Props) {
  return (
    <Flex
      py={2}
      borderBottom="2px"
      borderColor="gray.200"
      borderStyle="solid"
      alignItems="center"
      h="50px"
    >
      {props.children}
    </Flex>
  );
}

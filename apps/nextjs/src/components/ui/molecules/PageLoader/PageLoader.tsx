import { Flex, type FlexProps, Logo, Spinner } from '@/components/ui/atoms';

type Props = FlexProps;

export function PageLoader(props: Props) {
  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      bg="gray.700"
      zIndex="tooltip"
      flexDirection="column"
      {...props}
    >
      <Flex flex={1} alignItems="center" justifyContent="center">
        <Spinner color="gray.50" size="xl" />
      </Flex>
      <Flex pb={16} alignItems="center" justifyContent="center">
        <Logo color="gray.50" w="200px" h="36px" ml="-30px" />
      </Flex>
    </Flex>
  );
}

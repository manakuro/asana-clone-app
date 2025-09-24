import { Flex, Image, Logo, Text } from '@/components/ui/atoms';
import { useResponsive } from '@/hooks';
import { type PropsWithChildren, memo } from 'react';

type Props = PropsWithChildren;
export type MenuProps = Props;

export const Mobile = memo<Props>(function Mobile(props) {
  const { isMobile } = useResponsive();

  if (isMobile)
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
      >
        <Flex
          flex={1}
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Flex minW="160px" minH="160px" w="160px" h="160px">
            <Image w="full" src="/images/mobile.svg" />
          </Flex>
          <Text color="white" textAlign="center">
            The mobile page is not supported. <br />
            Please enjoy in your Desktop or Laptop PC.
          </Text>
        </Flex>
        <Flex pb={16} alignItems="center" justifyContent="center">
          <Logo color="gray.50" w="200px" h="36px" ml="-30px" />
        </Flex>
      </Flex>
    );

  return <>{props.children}</>;
});

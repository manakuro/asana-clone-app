import { Flex, type FlexProps } from '@/components/ui/atoms';

type Props = FlexProps & {
  isHovering: boolean;
};

export function Overlay(props: Props) {
  const { isHovering, ...rest } = props;

  return (
    <Flex
      borderRadius="lg"
      position="absolute"
      top={0}
      left={0}
      w="full"
      h="full"
      bg="gray.700"
      opacity={isHovering ? 0.5 : 0}
      zIndex="base"
      alignItems="center"
      justifyContent="flex-end"
      p={1}
      {...rest}
    />
  );
}

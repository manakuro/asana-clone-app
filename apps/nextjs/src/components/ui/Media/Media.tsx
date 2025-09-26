import { type BoxProps, Box as ChakraBox } from '@chakra-ui/react';

type Props = BoxProps & {
  mobile?: boolean;
  pc?: boolean;
};

export function Media({ pc, mobile, ...rest }: Props) {
  switch (true) {
    case Boolean(mobile):
      return <ChakraBox display={{ base: 'block', md: 'none' }} {...rest} />;
    case Boolean(pc):
      return <ChakraBox display={{ base: 'none', md: 'block' }} {...rest} />;
    default:
      return <>{rest.children}</>;
  }
}

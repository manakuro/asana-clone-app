import { Box, type BoxProps } from '@chakra-ui/react';

type Props = BoxProps & {
  mobile?: boolean;
  pc?: boolean;
};

export function Media({ pc, mobile, ...rest }: Props) {
  switch (true) {
    case Boolean(mobile):
      return <Box display={{ base: 'block', md: 'none' }} {...rest} />;
    case Boolean(pc):
      return <Box display={{ base: 'none', md: 'block' }} {...rest} />;
    default:
      return <>{rest.children}</>;
  }
}

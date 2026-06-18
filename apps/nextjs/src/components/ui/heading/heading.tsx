import {
  Heading as ChakraHeading,
  type HeadingProps as ChakraHeadingProps,
} from '@chakra-ui/react';

type Props = ChakraHeadingProps;
export type HeadingProps = Props;

export function Heading(props: Props) {
  return <ChakraHeading {...props} lineHeight={1.5} />;
}

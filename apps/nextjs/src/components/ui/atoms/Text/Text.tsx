import {
  Text as ChakraText,
  type TextProps as ChakraTextProps,
} from '@chakra-ui/react';

type Props = ChakraTextProps;
export type TextProps = Props;

export function Text(props: Props) {
  return <ChakraText {...props} />;
}

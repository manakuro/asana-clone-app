import {
  MenuCommand as ChakraMenuCommand,
  type MenuCommandProps as ChakraMenuCommandProps,
} from '@chakra-ui/react';

type Props = ChakraMenuCommandProps;
export type MenuCommandProps = Props;

export function MenuCommand(props: Props) {
  return <ChakraMenuCommand {...props} />;
}

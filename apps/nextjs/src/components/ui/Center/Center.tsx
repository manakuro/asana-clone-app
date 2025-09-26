import {
  Center as ChakraCenter,
  type CenterProps as ChakraCenterProps,
} from '@chakra-ui/react';

type Props = ChakraCenterProps;
export type CenterProps = Props;

export function Center(props: Props) {
  return <ChakraCenter {...props} />;
}

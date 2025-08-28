import { Divider as ChakraDivider, type DividerProps } from '@chakra-ui/react';

type Props = DividerProps;

export function Divider(props: Props) {
  return <ChakraDivider {...props} />;
}

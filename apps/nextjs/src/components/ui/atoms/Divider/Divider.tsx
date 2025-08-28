import { Divider as ChakraDivider, type DividerProps } from '@chakra-ui/react';
import type React from 'react';

type Props = DividerProps;

export function Divider(props: Props) {
  return <ChakraDivider {...props} />;
}

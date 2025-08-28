import {
  Spinner as ChakraSpinner,
  type SpinnerProps as ChakraSpinnerProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraSpinnerProps;
export type SpinnerProps = Props;

export function Spinner(props: Props) {
  return <ChakraSpinner {...props} />;
}

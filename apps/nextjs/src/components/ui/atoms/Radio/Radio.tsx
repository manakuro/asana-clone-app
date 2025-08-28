import {
  Radio as ChakraRadio,
  type RadioProps as ChakraRadioProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraRadioProps;
export type RadioProps = Props;

export function Radio(props: Props) {
  return <ChakraRadio {...props} />;
}

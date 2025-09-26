import {
  Switch as ChakraSwitch,
  type SwitchProps as ChakraSwitchProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraSwitchProps;
export type SwitchProps = Props;

export const Switch = forwardRef<HTMLInputElement, Props>(
  function Switch(props, ref) {
    return <ChakraSwitch {...props} ref={ref} />;
  },
);

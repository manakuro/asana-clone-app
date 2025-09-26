import {
  ButtonGroup as ChakraButtonGroup,
  type ButtonGroupProps as ChakraButtonGroupProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import type React from 'react';

type Props = ChakraButtonGroupProps & {
  ref?: React.MutableRefObject<any>;
};
export type ButtonGroupProps = ChakraButtonGroupProps;

export const ButtonGroup = forwardRef<HTMLDivElement, Props>(
  function ButtonGroup(props, ref) {
    return <ChakraButtonGroup {...props} fontWeight="normal" ref={ref} />;
  },
);

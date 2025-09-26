import {
  FormControl as ChakraFormControl,
  type FormControlProps as ChakraFormControlProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraFormControlProps;
export type FormControlProps = Props;

export const FormControl = forwardRef<HTMLDivElement, Props>(
  function FormControl(props, ref) {
    return <ChakraFormControl {...props} ref={ref} />;
  },
);

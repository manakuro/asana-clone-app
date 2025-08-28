import {
  FormLabel as ChakraFormLabel,
  type FormLabelProps as ChakraFormLabelProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraFormLabelProps;
export type FormLabelProps = Props;

export const FormLabel = forwardRef<HTMLLabelElement, Props>(
  function FormLabel(props, ref) {
    return <ChakraFormLabel {...props} ref={ref} />;
  },
);

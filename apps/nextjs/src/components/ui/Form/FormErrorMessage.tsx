import {
  FormErrorMessage as ChakraFormErrorMessage,
  type FormErrorMessageProps as ChakraFormErrorMessageProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraFormErrorMessageProps;
export type FormErrorMessageProps = Props;

export const FormErrorMessage = forwardRef<HTMLDivElement, Props>(
  function FormErrorMessage(props, ref) {
    return <ChakraFormErrorMessage {...props} ref={ref} />;
  },
);

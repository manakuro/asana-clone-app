import {
  FormHelperText as ChakraFormHelperText,
  type HelpTextProps as ChakraHelpTextProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraHelpTextProps;
export type FormHelperTextProps = Props;

export const FormHelperText = forwardRef<HTMLDivElement, Props>(
  function FormHelperText(props, ref) {
    return <ChakraFormHelperText {...props} ref={ref} />;
  },
);

import {
  Container as ChakraContainer,
  type ContainerProps as ChakraContainerProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraContainerProps;
export type ContainerProps = Props;

export const Container = forwardRef<HTMLDivElement, Props>(
  function Container(props, ref) {
    return <ChakraContainer {...props} ref={ref} />;
  },
);

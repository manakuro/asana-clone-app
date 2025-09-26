import {
  Slide as ChakraSlide,
  type SlideProps as ChakraSlideProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import type React from 'react';

type Props = ChakraSlideProps & {
  ref?: React.ForwardedRef<any>;
};
export type SlideProps = Props;

export const Slide = forwardRef<HTMLDivElement, Props>(
  function Slide(props, ref) {
    return <ChakraSlide {...props} ref={ref} />;
  },
);

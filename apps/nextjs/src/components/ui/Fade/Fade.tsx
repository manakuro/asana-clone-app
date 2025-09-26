import {
  Fade as ChakraFade,
  type FadeProps as ChakraFadeProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraFadeProps;
export type FadeProps = Props;

export const Fade = forwardRef<HTMLDivElement, Props>(
  function Fade(props, ref) {
    return <ChakraFade {...props} ref={ref} />;
  },
);

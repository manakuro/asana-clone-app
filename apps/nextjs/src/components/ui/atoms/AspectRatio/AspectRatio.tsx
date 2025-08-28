import {
  type AspectRatioProps,
  AspectRatio as ChakraAspectRatio,
} from '@chakra-ui/react';
import type React from 'react';

type Props = AspectRatioProps;

export function AspectRatio (props: Props) {
  return <ChakraAspectRatio {...props} />;
};

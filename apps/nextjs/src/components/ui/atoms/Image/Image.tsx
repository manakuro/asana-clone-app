import {
  Image as ChakraImage,
  type ImageProps as ChakraImageProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraImageProps;
export type ImageProps = Props;

export const Image: React.FC<Props> = (props) => {
  return <ChakraImage {...props} />;
};

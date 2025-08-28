import {
  Image as ChakraImage,
  type ImageProps as ChakraImageProps,
} from '@chakra-ui/react';

type Props = ChakraImageProps;
export type ImageProps = Props;

export function Image(props: Props) {
  return <ChakraImage {...props} />;
}

import {
  PopoverArrow as ChakraPopoverArrow,
  type PopoverArrowProps as ChakraPopoverArrowProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraPopoverArrowProps & {
  ref?: React.MutableRefObject<any>;
};
export type PopoverArrowProps = Props;

export const PopoverArrow: React.FC<Props> = (props) => {
  return <ChakraPopoverArrow {...props} />;
};

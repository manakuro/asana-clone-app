import {
  PopoverContent as ChakraPopoverContent,
  type PopoverContentProps as ChakraPopoverContentProps,
} from '@chakra-ui/react';
import type React from 'react';

import { forwardRef } from 'react';

type Props = ChakraPopoverContentProps & {
  ref?: React.MutableRefObject<any>;
};
export type PopoverContentProps = Props;

export const PopoverContent = forwardRef<HTMLDivElement, Props>(
  function PopoverContent(props, ref) {
    return (
      <ChakraPopoverContent {...props} ref={ref} aria-label="popover-content" />
    );
  },
);

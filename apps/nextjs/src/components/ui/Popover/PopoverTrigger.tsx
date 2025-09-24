import { PopoverTrigger as ChakraPopoverTrigger } from '@chakra-ui/react';
import React from 'react';

export function PopoverTrigger(props: React.PropsWithChildren) {
  if (!React.isValidElement(props.children)) {
    console.warn(
      '【src/components/organisms/Popover/PopoverTrigger.tsx】Children must be React component',
    );
    return null;
  }

  const children = React.cloneElement(props.children, {
    'aria-label': 'popover-trigger',
  });

  return <ChakraPopoverTrigger>{children}</ChakraPopoverTrigger>;
}

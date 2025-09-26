import {
  Button as AtomsButton,
  type ButtonProps,
} from '@/components/ui/Button';
import { forwardRef } from '@/shared/chakra';
import type React from 'react';

type Props = ButtonProps;

export const Button: React.FC<Props> = forwardRef((props, ref) => {
  return (
    <AtomsButton
      ref={ref}
      cursor="pointer"
      variant="ghost"
      size="sm"
      border="1px"
      borderColor="transparent"
      px={2}
      h="56px"
      w="full"
      textAlign="left"
      {...props}
    />
  );
});
Button.displayName = 'Button';

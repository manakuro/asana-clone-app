import { Button as AtomsButton, type ButtonProps } from '@/components/ui/atoms';
import { forwardRef } from 'react';

type Props = ButtonProps;

export const Button = forwardRef<HTMLButtonElement, Props>(
  function Button(props, ref) {
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
  },
);

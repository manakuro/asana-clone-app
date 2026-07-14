import { forwardRef } from 'react';
import {
  Button as AtomsButton,
  type ButtonProps,
} from '@/components/ui/button';
import { Menu } from '@/components/ui/menu';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    return (
      <Menu.Trigger asChild>
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
        >
          {props.children}
        </AtomsButton>
      </Menu.Trigger>
    );
  },
);

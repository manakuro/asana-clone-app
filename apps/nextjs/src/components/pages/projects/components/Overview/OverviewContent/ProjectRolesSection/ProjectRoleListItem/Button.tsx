import { forwardRef, type PropsWithChildren } from 'react';
import { Button as AtomsButton } from '@/components/ui/button';
import { Menu } from '@/components/ui/menu';

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren>(
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
          borderStyle="solid"
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

import { forwardRef } from 'react';
import { Button as AtomsButton } from '@/components/ui/Button';
import { MenuButton, type MenuButtonProps } from '@/components/ui/Menu';

export const Button = forwardRef<HTMLButtonElement, MenuButtonProps>(
  function Button(props, ref) {
    return (
      <MenuButton
        ref={ref}
        cursor="pointer"
        as={AtomsButton}
        variant="ghost"
        size="sm"
        border="1px"
        borderColor="transparent"
        px={2}
        h="56px"
        w="full"
      >
        {props.children}
      </MenuButton>
    );
  },
);

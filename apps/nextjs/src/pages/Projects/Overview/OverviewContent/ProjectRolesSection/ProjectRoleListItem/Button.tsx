import { Button as AtomsButton } from '@/components/ui/atoms';
import { MenuButton } from '@/components/ui/organisms/Menu';
import { forwardRef } from 'react';

type Props = {
  children: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
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

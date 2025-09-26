import { Button as AtomsButton } from '@/components/ui/Button';
import { MenuButton } from '@/components/ui/Menu';
import { forwardRef } from '@/shared/chakra';

export const Button = forwardRef(function Button(props, ref) {
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
});

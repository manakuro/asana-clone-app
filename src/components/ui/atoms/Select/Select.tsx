import React from 'react';
import { Input, type InputProps, Portal } from 'src/components/ui/atoms';
import {
  Menu,
  MenuButton,
  type MenuButtonProps,
  MenuList,
} from 'src/components/ui/organisms/Menu';

type Props = {
  value: string;
  onChange: (val: string) => void;
  size: InputProps['size'];
} & Omit<MenuButtonProps, 'onChange'>;

export const Select: React.FCWithChildren<Props> = (props) => {
  const { value, onChange, children, size, ...rest } = props;

  const options = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      console.warn('Provide React element under Select component');
      return null;
    }

    return React.cloneElement(child, {
      onChange,
    });
  });

  return (
    <Menu placement="bottom-start" isLazy>
      <MenuButton {...rest}>
        <Input size={size} value={props.value} onChange={() => {}} />
      </MenuButton>
      <Portal>
        <MenuList zIndex="popover" minW={28} maxH={60} overflowY="scroll">
          {options}
        </MenuList>
      </Portal>
    </Menu>
  );
};

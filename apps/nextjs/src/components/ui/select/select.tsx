import React from 'react';
import { Input, type InputProps } from '@/components/ui/input';
import { Menu, type MenuTriggerProps } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';

type Props = {
  value: string;
  onChange: (val: string) => void;
  size: InputProps['size'];
} & Omit<MenuTriggerProps, 'onChange'>;

export function Select(props: React.PropsWithChildren<Props>) {
  const { value, onChange, children, size, ...rest } = props;

  const options = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      console.warn('Provide React element under Select component');
      return null;
    }

    return React.cloneElement(child, {
      onChange,
    } as Partial<Props>);
  });

  return (
    <Menu.Root positioning={{ placement: 'bottom-start' }} lazyMount>
      <Menu.Trigger asChild {...rest}>
        <Input size={size} value={value} onChange={() => {}} />
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.RadioItemGroup
            zIndex="popover"
            minW={28}
            maxH={60}
            overflowY="scroll"
          >
            {options}
          </Menu.RadioItemGroup>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

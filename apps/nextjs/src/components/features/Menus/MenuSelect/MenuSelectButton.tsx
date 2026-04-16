import { memo } from 'react';
import { Button, type ButtonProps } from '@/components/ui/Button';
import { Menu } from '@/components/ui/Menu';
import { useMenuSelectContext } from './useMenuSelect';

type Props = ButtonProps;

export const MenuSelectButton = memo(function MenuSelectButton(props: Props) {
  const { onOpen } = useMenuSelectContext();

  return (
    <Menu.Trigger asChild>
      <Button {...props} onClick={onOpen} />
    </Menu.Trigger>
  );
});

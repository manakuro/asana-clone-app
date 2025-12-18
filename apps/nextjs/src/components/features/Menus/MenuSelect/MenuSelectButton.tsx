import { memo } from 'react';
import { MenuButton, type MenuButtonProps } from '@/components/ui/Menu';
import { useMenuSelectContext } from './useMenuSelect';

type Props = MenuButtonProps;

export const MenuSelectButton = memo(function MenuSelectButton(props: Props) {
  const { onOpen } = useMenuSelectContext();

  return <MenuButton onClick={onOpen} {...props} />;
});

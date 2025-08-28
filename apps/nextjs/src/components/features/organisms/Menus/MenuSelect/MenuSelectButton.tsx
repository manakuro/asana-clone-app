import {
  MenuButton,
  type MenuButtonProps,
} from '@/components/ui/organisms/Menu';
import { memo } from 'react';
import { useMenuSelectContext } from './useMenuSelect';

type Props = MenuButtonProps;

export const MenuSelectButton = memo(function MenuSelectButton(props: Props) {
  const { onOpen } = useMenuSelectContext();

  return <MenuButton onClick={onOpen} {...props} />;
});

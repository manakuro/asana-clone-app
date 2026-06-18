import { memo } from 'react';
import { Menu, type MenuTriggerProps } from '@/components/ui/menu';
import { useMenuSelectContext } from './useMenuSelect';

type Props = MenuTriggerProps;

export const MenuSelectTrigger = memo(function MenuSelectButton(props: Props) {
  const { onOpen } = useMenuSelectContext();

  return <Menu.Trigger asChild {...props} onClick={onOpen} />;
});

import { MenuList as AtomsMenuList, MenuItem } from '@/components/ui/Menu';
import { Portal } from '@/components/ui/Portal';

export function MenuList() {
  return (
    <Portal>
      <AtomsMenuList>
        <MenuItem isDisabled>Archive all</MenuItem>
        <MenuItem isDisabled>Manage notifications</MenuItem>
      </AtomsMenuList>
    </Portal>
  );
}

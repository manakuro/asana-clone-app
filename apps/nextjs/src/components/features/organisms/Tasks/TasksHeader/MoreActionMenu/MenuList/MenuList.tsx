import { MenuList as AtomsMenuList, MenuItem } from '@/components/ui/Menu';
import { memo } from 'react';

export const MenuList = memo(function MenuList() {
  return (
    <AtomsMenuList>
      <MenuItem isDisabled>Save layout as default</MenuItem>
    </AtomsMenuList>
  );
});

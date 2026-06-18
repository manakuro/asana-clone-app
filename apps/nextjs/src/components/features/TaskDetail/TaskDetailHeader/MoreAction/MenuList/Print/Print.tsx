import { memo } from 'react';
import { Menu } from '@/components/ui/menu';

export const Print = memo(function Print() {
  return (
    <Menu.Item disabled value="Print">
      Print
    </Menu.Item>
  );
});

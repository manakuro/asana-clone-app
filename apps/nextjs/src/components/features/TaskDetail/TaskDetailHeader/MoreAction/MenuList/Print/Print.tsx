import { memo } from 'react';
import { Menu } from '@/components/ui/Menu';

export const Print = memo(function Print() {
  return (
    <Menu.Item disabled value="Print">
      Print
    </Menu.Item>
  );
});

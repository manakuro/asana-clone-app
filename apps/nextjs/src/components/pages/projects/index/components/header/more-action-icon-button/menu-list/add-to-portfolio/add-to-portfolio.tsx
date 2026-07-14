import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';

export const AddToPortfolio = memo(function AddToPortfolio() {
  return (
    <Menu.Item value="Add to Portfolio" disabled>
      <Icon icon="plus" color="fg.muted" />
      Add to Portfolio
    </Menu.Item>
  );
});

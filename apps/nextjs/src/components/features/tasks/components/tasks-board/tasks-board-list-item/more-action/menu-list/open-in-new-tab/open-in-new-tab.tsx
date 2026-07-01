import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';

export const OpenInNewTab = memo(function OpenInNewTab() {
  return (
    <Menu.Item disabled value="Open in new tab">
      <Icon icon="linkExternal" color="fg.muted" />
      Open in new tab
    </Menu.Item>
  );
});

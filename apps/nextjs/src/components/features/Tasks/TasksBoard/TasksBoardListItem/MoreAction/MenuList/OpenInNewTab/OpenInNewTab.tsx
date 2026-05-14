import { memo } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';

export const OpenInNewTab = memo(function OpenInNewTab() {
  return (
    <Menu.Item disabled value="Open in new tab">
      <Icon icon="linkExternal" color="fg.muted" />
      Open in new tab
    </Menu.Item>
  );
});

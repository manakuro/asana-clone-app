import { memo } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';

export const ConvertToTemplate = memo(function ConvertToTemplate() {
  return (
    <Menu.Item value="Convert to template" disabled>
      <Icon icon="layout" color="fg.muted" />
      Convert to template
    </Menu.Item>
  );
});

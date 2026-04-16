import { memo } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  projectId: string;
};

export const ConvertToTemplate = memo(function ConvertToTemplate(props: Props) {
  const { onMouseEnter } = props;

  return (
    <Menu.Item value="" onMouseEnter={onMouseEnter} disabled>
      <Icon icon="layout" color="text.muted" />
      Convert to template
    </Menu.Item>
  );
});

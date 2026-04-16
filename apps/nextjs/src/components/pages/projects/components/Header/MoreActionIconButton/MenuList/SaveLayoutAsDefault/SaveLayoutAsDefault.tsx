import { memo } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  projectId: string;
};

export const SaveLayoutAsDefault = memo(function SaveLayoutAsDefault(
  props: Props,
) {
  const { onMouseEnter } = props;

  return (
    <Menu.Item value="" onMouseEnter={onMouseEnter} disabled>
      <Icon icon="save" color="text.muted" />
      Save layout as default
    </Menu.Item>
  );
});

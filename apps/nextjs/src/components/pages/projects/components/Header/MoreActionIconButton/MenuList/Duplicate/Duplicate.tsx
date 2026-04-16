import { memo } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  projectId: string;
};

export const Duplicate = memo(function Duplicate(props: Props) {
  const { onMouseEnter } = props;

  return (
    <Menu.Item value="" onMouseEnter={onMouseEnter} disabled>
      <Icon icon="copyAlt" color="text.muted" />
      Duplicate
    </Menu.Item>
  );
});

import { memo } from 'react';
import { Menu } from '@/components/ui/Menu';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  projectId: string;
};

export const Archive = memo(function Archive(props: Props) {
  const { onMouseEnter } = props;

  return (
    <Menu.Item value="" onMouseEnter={onMouseEnter} disabled>
      Archive
    </Menu.Item>
  );
});

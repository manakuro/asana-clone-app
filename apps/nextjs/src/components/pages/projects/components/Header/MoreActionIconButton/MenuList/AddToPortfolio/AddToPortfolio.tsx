import { memo } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  projectId: string;
};

export const AddToPortfolio = memo(function AddToPortfolio(props: Props) {
  const { onMouseEnter } = props;

  return (
    <Menu.Item value="" onMouseEnter={onMouseEnter} disabled>
      <Icon icon="plus" color="text.muted" />
      Add to Portfolio
    </Menu.Item>
  );
});

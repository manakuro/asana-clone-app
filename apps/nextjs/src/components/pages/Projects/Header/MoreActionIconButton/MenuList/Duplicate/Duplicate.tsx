import { MenuItem } from '@/components/ui/Menu';
import { Icon } from '@/components/ui/atoms';
import { memo } from 'react';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  projectId: string;
};

export const Duplicate = memo(function Duplicate(props: Props) {
  const { onMouseEnter } = props;

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="copyAlt" color="text.muted" />}
      isDisabled
    >
      Duplicate
    </MenuItem>
  );
});

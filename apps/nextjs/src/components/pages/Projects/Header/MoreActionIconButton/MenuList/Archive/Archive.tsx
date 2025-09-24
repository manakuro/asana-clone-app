import { MenuItem } from '@/components/ui/Menu';
import { memo } from 'react';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  projectId: string;
};

export const Archive = memo(function Archive(props: Props) {
  const { onMouseEnter } = props;

  return (
    <MenuItem onMouseEnter={onMouseEnter} isDisabled>
      Archive
    </MenuItem>
  );
});

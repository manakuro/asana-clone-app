import { MenuItem } from '@/components/ui/organisms/Menu';
import { memo, useCallback } from 'react';

type Props = {
  onMouseEnter: () => void;
  onClose: () => void;
  taskId: string;
};

export const Print = memo(function Print(props: Props) {
  const { onMouseEnter, onClose } = props;

  const handleClick = useCallback(async () => {
    onClose();
  }, [onClose]);

  return (
    <MenuItem onMouseEnter={onMouseEnter} onClick={handleClick} isDisabled>
      Print
    </MenuItem>
  );
});

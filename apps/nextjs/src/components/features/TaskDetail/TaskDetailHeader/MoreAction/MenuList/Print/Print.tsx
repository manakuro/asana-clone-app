import { memo, useCallback } from 'react';
import { Menu } from '@/components/ui/Menu';

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
    <Menu.Item
      onMouseEnter={onMouseEnter}
      onClick={handleClick}
      disabled
      value=""
    >
      Print
    </Menu.Item>
  );
});

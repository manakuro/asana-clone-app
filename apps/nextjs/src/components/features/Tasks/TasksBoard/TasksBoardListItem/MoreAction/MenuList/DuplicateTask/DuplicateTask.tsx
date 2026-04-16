import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';

type Props = {
  onMouseEnter: () => void;
  onCloseMenu: () => void;
  taskId: string;
};
export const DuplicateTask = memo(function DuplicateTask(props: Props) {
  const { onMouseEnter, onCloseMenu } = props;

  const handleClick = useCallback(() => {
    onCloseMenu();
  }, [onCloseMenu]);

  return (
    <Menu.Item
      onMouseEnter={onMouseEnter}
      onClick={handleClick}
      disabled
      value=""
    >
      <Icon icon="copyAlt" color="text.muted" />
      Duplicate task
    </Menu.Item>
  );
});

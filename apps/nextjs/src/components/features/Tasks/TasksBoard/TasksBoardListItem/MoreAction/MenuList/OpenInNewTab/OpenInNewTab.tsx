import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';

type Props = {
  onMouseEnter: () => void;
  onCloseMenu: () => void;
  taskId: string;
};
export const OpenInNewTab = memo(function OpenInNewTab(props: Props) {
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
      <Icon icon="linkExternal" color="text.muted" />
      Open in new tab
    </Menu.Item>
  );
});

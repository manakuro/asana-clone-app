import { Icon } from '@/components/ui/Icon';
import { MenuItem } from '@/components/ui/Menu';
import { memo, useCallback } from 'react';

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
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="linkExternal" color="text.muted" />}
      onClick={handleClick}
      isDisabled
    >
      Open in new tab
    </MenuItem>
  );
});

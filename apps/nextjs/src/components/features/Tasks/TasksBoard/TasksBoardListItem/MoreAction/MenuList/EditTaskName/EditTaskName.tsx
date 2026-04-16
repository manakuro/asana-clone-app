import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';
import { useTasksBoardListItemInputContext } from '../../../Provider';

type Props = {
  onMouseEnter: () => void;
  onCloseMenu: () => void;
};
export const EditTaskName = memo(function EditTaskName(props: Props) {
  const { onInputSelect } = useTasksBoardListItemInputContext();
  const { onMouseEnter, onCloseMenu } = props;

  const handleEditTaskName = useCallback(() => {
    onInputSelect();
    onCloseMenu();
  }, [onCloseMenu, onInputSelect]);

  return (
    <Menu.Item
      onMouseEnter={onMouseEnter}
      onClick={handleEditTaskName}
      value=""
    >
      <Icon icon="editAlt" color="text.muted" />
      Edit task name
    </Menu.Item>
  );
});

import { Icon } from '@/components/ui/atoms';
import { MenuItem } from '@/components/ui/organisms/Menu';
import { memo, useCallback } from 'react';
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
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="editAlt" color="text.muted" />}
      onClick={handleEditTaskName}
    >
      Edit task name
    </MenuItem>
  );
});

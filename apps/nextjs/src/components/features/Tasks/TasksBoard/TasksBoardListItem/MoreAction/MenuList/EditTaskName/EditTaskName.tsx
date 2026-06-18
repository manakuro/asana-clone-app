import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';
import { useTasksBoardListItemInputContext } from '../../../Provider';

export const EditTaskName = memo(function EditTaskName() {
  const { onInputSelect } = useTasksBoardListItemInputContext();

  const handleEditTaskName = useCallback(() => {
    onInputSelect();
  }, [onInputSelect]);

  return (
    <Menu.Item onSelect={handleEditTaskName} value="Edit task name">
      <Icon icon="editAlt" color="fg.muted" />
      Edit task name
    </Menu.Item>
  );
});

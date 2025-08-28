import { Icon } from '@/components/ui/atoms';
import { MenuItem } from '@/components/ui/organisms/Menu';
import { useTask } from '@/store/entities/task';
import { memo, useCallback } from 'react';
import { useTasksBoardListItemContext } from '../../../Provider';

type Props = {
  onMouseEnter: () => void;
  onCloseMenu: () => void;
  taskId: string;
};
export const MarkComplete = memo(function MarkComplete(props: Props) {
  const { task } = useTask(props.taskId);
  const { onToggleDone } = useTasksBoardListItemContext();
  const { onMouseEnter, onCloseMenu } = props;

  const handleClick = useCallback(async () => {
    onToggleDone();
    onCloseMenu();
  }, [onToggleDone, onCloseMenu]);

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="checkCircle" color="text.muted" />}
      onClick={handleClick}
    >
      {task.completed ? 'Mark Incomplete' : 'Mark complete'}
    </MenuItem>
  );
});

import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';
import { useTask } from '@/store/entities/task';
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
    <Menu.Item onMouseEnter={onMouseEnter} onClick={handleClick} value="">
      <Icon icon="checkCircle" color="fg.muted" />
      {task.completed ? 'Mark Incomplete' : 'Mark complete'}
    </Menu.Item>
  );
});

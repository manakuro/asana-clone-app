import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';
import { useTask } from '@/store/entities/task';
import { useTasksBoardListItemContext } from '../../../Provider';

type Props = {
  taskId: string;
};
export const MarkComplete = memo(function MarkComplete(props: Props) {
  const { task } = useTask(props.taskId);
  const { onToggleDone } = useTasksBoardListItemContext();

  const handleClick = useCallback(async () => {
    onToggleDone();
  }, [onToggleDone]);

  return (
    <Menu.Item onSelect={handleClick} value="Mark complete or incomplete">
      <Icon icon="checkCircle" color="fg.muted" />
      {task.completed ? 'Mark Incomplete' : 'Mark complete'}
    </Menu.Item>
  );
});

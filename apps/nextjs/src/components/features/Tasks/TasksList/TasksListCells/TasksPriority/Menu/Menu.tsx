import { memo, type PropsWithChildren, useCallback } from 'react';
import {
  MenuSelect,
  MenuSelectList,
  MenuSelectTrigger,
} from '@/components/features/Menus';
import { Button } from '@/components/ui/Button';
import { Menu as UIMenu } from '@/components/ui/Menu';
import { useTask } from '@/store/entities/task';
import { useTasksPriorities } from '@/store/entities/taskPriority';

type Props = PropsWithChildren<{
  taskId: string;
  onOpened?: () => void;
  onClosed?: () => void;
}>;

export const Menu = memo(function Menu(props: Props) {
  const { taskId, onOpened, onClosed } = props;
  const { task, setTask } = useTask(taskId);
  const defaultValue = task.taskPriorityId;
  const { taskPriorities } = useTasksPriorities();

  const handleChange = useCallback(
    async (taskPriorityId: string) => {
      await setTask({ taskPriorityId });
    },
    [setTask],
  );

  return (
    <MenuSelect<string>
      onChange={handleChange}
      positioning={{ placement: 'bottom-end' }}
      onOpened={onOpened}
      onClosed={onClosed}
    >
      <MenuSelectTrigger flex={1} h="full">
        <Button>{props.children}</Button>
      </MenuSelectTrigger>
      <MenuSelectList defaultValue={defaultValue}>
        {taskPriorities.map((t) => (
          <UIMenu.RadioItem value={t.id} key={t.id}>
            {t.name}
            <UIMenu.ItemIndicator />
          </UIMenu.RadioItem>
        ))}
      </MenuSelectList>
    </MenuSelect>
  );
});

import { memo, type PropsWithChildren, useCallback } from 'react';
import { Menu as UIMenu } from '@/components/ui/menu';
import {
  MenuSelect,
  MenuSelectList,
  MenuSelectTrigger,
} from '@/components/ui/menu-select';
import { useTask } from '@/features/task/store/task';
import { useTasksPriorities } from '@/features/task/store/task-priority';

type Props = PropsWithChildren<{
  taskId: string;
  onOpened?: () => void;
  onClosed?: () => void;
}>;

export const Menu = memo(function Menu(props: Props) {
  const { taskId, onOpened, onClosed } = props;
  const { task, setTask } = useTask(taskId);
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
      listStatus={task.taskPriorityId}
    >
      <MenuSelectTrigger flex={1} h="full">
        {props.children}
      </MenuSelectTrigger>
      <MenuSelectList>
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

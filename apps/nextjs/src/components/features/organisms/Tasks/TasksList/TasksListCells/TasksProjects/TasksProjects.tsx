import { TasksListCell } from '@/components/features/organisms/Tasks/TasksList/TasksListCell';
import { type FlexProps, Stack } from '@/components/ui/atoms';
import { useProjectTaskIdsByTaskId } from '@/store/entities/projectTask';
import { memo, useCallback, useState } from 'react';
import { Input } from './Input';
import { ListItem } from './ListItem';

type Props = FlexProps & {
  taskId: string;
  width: string;
};

export const TasksProjects = memo(function TasksProjects(props: Props) {
  const { projectTaskIds } = useProjectTaskIdsByTaskId(props.taskId);
  const [focused, setFocused] = useState<boolean>(false);

  const onFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const onUnfocus = useCallback(() => {
    setFocused(false);
  }, []);

  return (
    <TasksListCell
      hover
      cursor="pointer"
      onClick={onFocus}
      containerStyle={{
        w: props.width,
        minW: '120px',
        maxW: '280px',
        position: 'relative',
        zIndex: focused ? 'docked' : '',
      }}
    >
      {!focused && (
        <Stack direction="row" spacing={1} overflow="hidden">
          {projectTaskIds.map((id) => (
            <ListItem projectTaskId={id} key={id} />
          ))}
        </Stack>
      )}
      {focused && (
        <Input focused={focused} onClose={onUnfocus} taskId={props.taskId} />
      )}
    </TasksListCell>
  );
});

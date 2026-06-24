import { memo, useCallback, useState } from 'react';
import { TasksListCell } from '@/components/features/tasks/tasks-list/tasks-list-cell';
import type { FlexProps } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { useProjectTaskIdsByTaskId } from '@/store/entities/project-task';
import { Input } from './input';
import { ListItem } from './list-item';

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
        <Stack direction="row" gap={1} overflow="hidden">
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

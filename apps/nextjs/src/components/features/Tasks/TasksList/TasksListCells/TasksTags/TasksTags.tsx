import { memo, useCallback, useState } from 'react';
import { TagChip } from '@/components/features/Chips';
import { TasksListCell } from '@/components/features/Tasks/TasksList/TasksListCell';
import type { FlexProps } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { useTaskTagIdsByTaskId } from '@/store/entities/taskTag';
import { Input } from './Input';

type Props = FlexProps & {
  taskId: string;
  width: string;
};

export const TasksTags = memo(function TasksTags(props: Props) {
  const { taskTagIds } = useTaskTagIdsByTaskId(props.taskId);
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
          {taskTagIds.map((id) => (
            <TagChip key={id} taskTagId={id} variant="button" />
          ))}
        </Stack>
      )}
      {focused && (
        <Input focused={focused} onClose={onUnfocus} taskId={props.taskId} />
      )}
    </TasksListCell>
  );
});

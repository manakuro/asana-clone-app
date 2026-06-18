import { memo } from 'react';
import type { FlexProps } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { useTaskTagIdsByTaskId } from '@/store/entities/taskTag';
import { Tag } from './Tag';

type Props = FlexProps & {
  taskId: string;
};

export const Tags = memo(function Tags(props: Props) {
  const { taskTagIds } = useTaskTagIdsByTaskId(props.taskId);

  return (
    <Stack direction="row" gap={1} overflow="hidden">
      {taskTagIds.map((id) => (
        <Tag taskTagId={id} key={id} />
      ))}
    </Stack>
  );
});

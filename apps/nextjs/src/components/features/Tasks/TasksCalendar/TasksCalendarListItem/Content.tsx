import { memo } from 'react';
import { useTasksTaskIdsByDueDate } from '@/components/features/Tasks/hooks';
import { Stack } from '@/components/ui/stack';
import { ListItem } from './ListItem';

type Props = {
  dateString: string;
};

export const Content = memo(function Content(props: Props) {
  const { dateString } = props;
  const { taskIds } = useTasksTaskIdsByDueDate(dateString);

  if (!taskIds.length) return null;

  return (
    <Stack mt={2} gap={2}>
      {taskIds.map((id) => (
        <ListItem key={id} taskId={id} />
      ))}
    </Stack>
  );
});

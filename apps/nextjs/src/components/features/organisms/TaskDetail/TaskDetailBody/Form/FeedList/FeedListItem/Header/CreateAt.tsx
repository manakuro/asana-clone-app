import { Text, type TextProps } from '@/components/ui/atoms';
import { formatFeedCreatedAt } from '@/shared/date';
import { memo } from 'react';
import { useTaskFeedListItemContext } from '../Provider';

type Props = TextProps;

export const CreateAt = memo(function CreateAt(props: Props) {
  const { taskFeed } = useTaskFeedListItemContext();
  return (
    <Text fontSize="xs" color="text.muted" ml={2}>
      {formatFeedCreatedAt(taskFeed.createdAt)}
      {taskFeed.updatedAt ? ' (edited)' : ''}
    </Text>
  );
});

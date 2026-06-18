import { memo } from 'react';
import { Text, type TextProps } from '@/components/ui/text';
import { formatFeedCreatedAt } from '@/shared/date';
import { useTaskFeedListItemContext } from '../Provider';

type Props = TextProps;

export const CreateAt = memo(function CreateAt(_props: Props) {
  const { taskFeed } = useTaskFeedListItemContext();
  return (
    <Text fontSize="xs" color="fg.muted" ml={2}>
      {formatFeedCreatedAt(taskFeed.createdAt)}
      {taskFeed.updatedAt ? ' (edited)' : ''}
    </Text>
  );
});

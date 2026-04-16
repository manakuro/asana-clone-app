import { memo } from 'react';
import { Menu } from '@/components/ui/Menu';
import { useTaskFeedListItemContext } from '../../Provider';

export const DeleteComment = memo(function DeleteComment() {
  const { hasText, onDelete } = useTaskFeedListItemContext();
  if (!hasText) return null;

  return (
    <Menu.Item value="" color="alert" onClick={onDelete}>
      Delete comment
    </Menu.Item>
  );
});

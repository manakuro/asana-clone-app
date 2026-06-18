import { memo } from 'react';
import { Menu } from '@/components/ui/menu';
import { useTaskFeedListItemContext } from '../../Provider';

export const DeleteComment = memo(function DeleteComment() {
  const { hasText, onDelete } = useTaskFeedListItemContext();
  if (!hasText) return null;

  return (
    <Menu.Item value="Delete comment" color="alert" onSelect={onDelete}>
      Delete comment
    </Menu.Item>
  );
});

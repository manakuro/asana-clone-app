import { MenuItem } from '@/components/ui/Menu';
import { memo } from 'react';
import { useTaskFeedListItemContext } from '../../Provider';

export const DeleteComment = memo(function DeleteComment() {
  const { hasText, onDelete } = useTaskFeedListItemContext();
  if (!hasText) return null;

  return (
    <MenuItem color="alert" onClick={onDelete}>
      Delete comment
    </MenuItem>
  );
});

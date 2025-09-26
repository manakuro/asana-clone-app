import { MenuItem } from '@/components/ui/Menu';
import { memo } from 'react';
import { useTaskFeedListItemContext } from '../../Provider';

export const EditComment = memo(function EditComment() {
  const { onEdit, hasText } = useTaskFeedListItemContext();
  if (!hasText) return null;

  return <MenuItem onClick={onEdit}>Edit comment</MenuItem>;
});

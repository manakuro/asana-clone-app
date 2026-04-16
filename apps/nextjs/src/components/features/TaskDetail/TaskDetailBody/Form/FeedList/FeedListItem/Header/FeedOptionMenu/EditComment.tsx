import { memo } from 'react';
import { Menu } from '@/components/ui/Menu';
import { useTaskFeedListItemContext } from '../../Provider';

export const EditComment = memo(function EditComment() {
  const { onEdit, hasText } = useTaskFeedListItemContext();
  if (!hasText) return null;

  return (
    <Menu.Item value="" onClick={onEdit}>
      Edit comment
    </Menu.Item>
  );
});

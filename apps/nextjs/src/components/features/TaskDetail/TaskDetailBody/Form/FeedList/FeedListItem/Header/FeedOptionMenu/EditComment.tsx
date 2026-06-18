import { memo } from 'react';
import { Menu } from '@/components/ui/menu';
import { useTaskFeedListItemContext } from '../../Provider';

export const EditComment = memo(function EditComment() {
  const { onEdit, hasText } = useTaskFeedListItemContext();
  if (!hasText) return null;

  return (
    <Menu.Item value="Edit comment" onSelect={onEdit}>
      Edit comment
    </Menu.Item>
  );
});

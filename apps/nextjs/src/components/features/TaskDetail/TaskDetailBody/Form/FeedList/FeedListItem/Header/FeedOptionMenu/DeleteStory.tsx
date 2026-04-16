import { memo } from 'react';
import { Menu } from '@/components/ui/Menu';
import { useTaskFeedListItemContext } from '../../Provider';

export const DeleteStory = memo(function DeleteStory() {
  const { hasTaskFile, hasText } = useTaskFeedListItemContext();
  if (hasText || !hasTaskFile) return null;

  return (
    <Menu.Item value="" color="alert">
      Delete Story
    </Menu.Item>
  );
});

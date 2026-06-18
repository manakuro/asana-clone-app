import { memo } from 'react';
import { Menu } from '@/components/ui/menu';
import { useTaskFeedListItemContext } from '../../Provider';

export const DeleteStory = memo(function DeleteStory() {
  const { hasTaskFile, hasText } = useTaskFeedListItemContext();
  if (hasText || !hasTaskFile) return null;

  return (
    <Menu.Item value="Delete story" color="alert">
      Delete Story
    </Menu.Item>
  );
});

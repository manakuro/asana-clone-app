import { MenuItem } from '@/components/ui/Menu';
import { memo } from 'react';
import { useTaskFeedListItemContext } from '../../Provider';

export const DeleteStory = memo(function DeleteStory() {
  const { hasTaskFile, hasText } = useTaskFeedListItemContext();
  if (hasText || !hasTaskFile) return null;

  return <MenuItem color="alert">Delete Story</MenuItem>;
});

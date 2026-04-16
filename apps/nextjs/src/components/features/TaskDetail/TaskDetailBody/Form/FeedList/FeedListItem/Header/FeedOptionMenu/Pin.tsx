import { memo } from 'react';
import { Menu } from '@/components/ui/Menu';
import { useTaskFeedListItemContext } from '../../Provider';

export const Pin = memo(function Pin() {
  const { onUnpin, onPin, taskFeed } = useTaskFeedListItemContext();

  if (taskFeed.isPinned)
    return (
      <Menu.Item value="" onClick={onUnpin}>
        Unpin from top
      </Menu.Item>
    );

  return (
    <Menu.Item value="" onClick={onPin}>
      Pin to top
    </Menu.Item>
  );
});

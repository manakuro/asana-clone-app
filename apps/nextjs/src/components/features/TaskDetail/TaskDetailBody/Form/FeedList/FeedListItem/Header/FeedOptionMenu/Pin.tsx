import { memo } from 'react';
import { Menu } from '@/components/ui/menu';
import { useTaskFeedListItemContext } from '../../Provider';

export const Pin = memo(function Pin() {
  const { onUnpin, onPin, taskFeed } = useTaskFeedListItemContext();

  if (taskFeed.isPinned)
    return (
      <Menu.Item value="Unpin from top" onSelect={onUnpin}>
        Unpin from top
      </Menu.Item>
    );

  return (
    <Menu.Item value="Pin to top" onSelect={onPin}>
      Pin to top
    </Menu.Item>
  );
});

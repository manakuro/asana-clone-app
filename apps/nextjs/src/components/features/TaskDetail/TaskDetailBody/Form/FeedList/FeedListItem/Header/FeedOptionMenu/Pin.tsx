import { memo } from 'react';

import { MenuItem } from '@/components/ui/Menu';
import { useTaskFeedListItemContext } from '../../Provider';

export const Pin = memo(function Pin() {
  const { onUnpin, onPin, taskFeed } = useTaskFeedListItemContext();

  if (taskFeed.isPinned)
    return <MenuItem onClick={onUnpin}>Unpin from top</MenuItem>;

  return <MenuItem onClick={onPin}>Pin to top</MenuItem>;
});

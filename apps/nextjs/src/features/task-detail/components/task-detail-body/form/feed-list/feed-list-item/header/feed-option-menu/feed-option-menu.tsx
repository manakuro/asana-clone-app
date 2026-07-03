import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Menu } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';
import { useTaskFeedListItemContext } from '../../provider';
import { CopyCommentLink } from './copy-comment-link';
import { DeleteComment } from './delete-comment';
import { DeleteStory } from './delete-story';
import { EditComment } from './edit-comment';
import { Pin } from './pin';

export const FeedOptionMenu = memo(function FeedOptionMenu() {
  const { showFeedOptionMenu } = useTaskFeedListItemContext();
  if (!showFeedOptionMenu) return null;

  return (
    <Menu.Root lazyMount positioning={{ placement: 'bottom-end' }}>
      <Menu.Trigger asChild>
        <IconButton aria-label="Feed option menu" size="sm" variant="ghost">
          <Icon icon="chevronDown" color="fg.muted" />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.ItemGroup>
              <Pin />
              <EditComment />
              <DeleteComment />
              <DeleteStory />
              <CopyCommentLink />
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
});

import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Menu, MenuButton, MenuGroup, MenuList } from '@/components/ui/Menu';
import { Portal } from '@/components/ui/Portal';
import { memo } from 'react';
import { useTaskFeedListItemContext } from '../../Provider';
import { CopyCommentLink } from './CopyCommentLink';
import { DeleteComment } from './DeleteComment';
import { DeleteStory } from './DeleteStory';
import { EditComment } from './EditComment';
import { Pin } from './Pin';

export const FeedOptionMenu = memo(function FeedOptionMenu() {
  const { showFeedOptionMenu } = useTaskFeedListItemContext();
  if (!showFeedOptionMenu) return null;

  return (
    <Menu isLazy lazyBehavior="keepMounted" placement="bottom-end">
      <MenuButton
        aria-label="Feed option menu"
        as={IconButton}
        icon={<Icon icon="chevronDown" color="text.muted" />}
        size="sm"
        variant="ghost"
      />
      <Portal>
        <MenuList>
          <MenuGroup>
            <Pin />
            <EditComment />
            <DeleteComment />
            <DeleteStory />
            <CopyCommentLink />
          </MenuGroup>
        </MenuList>
      </Portal>
    </Menu>
  );
});

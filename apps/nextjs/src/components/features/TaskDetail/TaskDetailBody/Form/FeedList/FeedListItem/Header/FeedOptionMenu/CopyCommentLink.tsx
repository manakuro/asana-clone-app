import { memo } from 'react';
import { Menu } from '@/components/ui/Menu';
import { useTaskFeedListItemContext } from '../../Provider';

export const CopyCommentLink = memo(function CopyCommentLink() {
  const { onCopyCommentLink, hasText } = useTaskFeedListItemContext();
  if (!hasText) return null;

  return (
    <Menu.Item value="" onClick={onCopyCommentLink}>
      Copy comment link
    </Menu.Item>
  );
});

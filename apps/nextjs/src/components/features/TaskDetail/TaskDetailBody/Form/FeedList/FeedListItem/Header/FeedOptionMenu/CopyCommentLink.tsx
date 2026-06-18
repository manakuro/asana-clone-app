import { memo } from 'react';
import { Menu } from '@/components/ui/menu';
import { useTaskFeedListItemContext } from '../../Provider';

export const CopyCommentLink = memo(function CopyCommentLink() {
  const { onCopyCommentLink, hasText } = useTaskFeedListItemContext();
  if (!hasText) return null;

  return (
    <Menu.Item value="Copy comment link" onSelect={onCopyCommentLink}>
      Copy comment link
    </Menu.Item>
  );
});

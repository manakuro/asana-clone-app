import { LikeIconButton } from '@/components/ui/like-icon-button';
import { useTaskFeedListItemContext } from '../../provider';
import { useLike } from './use-like';

export function Like() {
  const { showLike } = useTaskFeedListItemContext();
  const { hasAnyoneLiked, label, likeLength, onToggleLike } = useLike();

  return (
    <LikeIconButton
      show={showLike}
      hasAnyoneLiked={hasAnyoneLiked}
      label={label}
      likeLength={likeLength}
      onToggleLike={onToggleLike}
    />
  );
}

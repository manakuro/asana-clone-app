import { LikeIconButton } from '@/components/ui/LikeIconButton';
import { useTaskFeedListItemContext } from '../../Provider';
import { useLike } from './useLike';

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

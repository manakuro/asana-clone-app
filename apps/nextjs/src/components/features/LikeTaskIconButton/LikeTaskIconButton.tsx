import { memo } from 'react';
import type { IconButtonProps } from '@/components/ui/icon-button';
import { LikeIconButton } from '@/components/ui/like-icon-button';
import type { TextProps } from '@/components/ui/text';
import { useLike } from './useLike';

type Props = {
  taskId: string;
  show?: boolean;
  textStyle?: TextProps;
} & Omit<IconButtonProps, 'aria-label' | 'icon' | 'textStyle'>;

export const LikeTaskIconButton = memo(function LikeTaskIconButton(
  props: Props,
) {
  const { show, taskId: _, ...rest } = props;
  const { hasAnyoneLiked, label, likeLength, onToggleLike } = useLike(props);

  return (
    <LikeIconButton
      show={show}
      hasAnyoneLiked={hasAnyoneLiked}
      label={label}
      likeLength={likeLength}
      onToggleLike={onToggleLike}
      {...rest}
    />
  );
});

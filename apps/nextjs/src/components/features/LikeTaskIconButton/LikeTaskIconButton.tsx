import { memo } from 'react';
import type { IconButtonProps } from '@/components/ui/IconButton';
import { LikeIconButton } from '@/components/ui/LikeIconButton';
import type { TextProps } from '@/components/ui/Text';
import { useLike } from './useLike';

type Props = {
  taskId: string;
  show?: boolean;
  textStyle?: TextProps;
} & Omit<IconButtonProps, 'aria-label' | 'icon' | 'textStyle'>;

export const LikeTaskIconButton = memo(function LikeTaskIconButton(
  props: Props,
) {
  const { show, ...rest } = props;
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

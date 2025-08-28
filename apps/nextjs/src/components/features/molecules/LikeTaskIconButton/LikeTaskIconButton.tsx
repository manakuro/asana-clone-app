import type { IconButtonProps, TextProps } from '@/components/ui/atoms';
import { LikeIconButton } from '@/components/ui/molecules';
import { memo } from 'react';
import { useLike } from './useLike';

type Props = {
  taskId: string;
  show?: boolean;
  textStyle?: TextProps;
} & Omit<IconButtonProps, 'aria-label' | 'icon' | 'textStyle'>;

export const LikeTaskIconButton = memo(function LikeTaskIconButton(
  props: Props,
) {
  const { taskId, show, ...rest } = props;
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

import type React from 'react';
import { memo, useCallback } from 'react';
import { IconButton, type IconButtonProps } from '@/components/ui/icon-button';
import type { TextProps } from '@/components/ui/text';
import { Icon } from './icon';

type Props = {
  hasAnyoneLiked: boolean;
  label: string;
  likeLength: number;
  onToggleLike: () => void;
  show?: boolean;
  textStyle?: TextProps;
} & Omit<IconButtonProps, 'aria-label' | 'icon' | 'textStyle'>;
export type LikeButtonProps = Props;

export const LikeIconButton = memo(function LikeIconButton(props: Props) {
  const {
    hasAnyoneLiked,
    label,
    likeLength,
    onToggleLike,
    show,
    textStyle,
    ...rest
  } = props;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      onToggleLike();
    },
    [onToggleLike],
  );

  if (!show) return null;

  return (
    <IconButton
      aria-label="Like this"
      variant="ghost"
      size="sm"
      onClick={handleClick}
      {...rest}
    >
      <Icon
        hasAnyoneLiked={hasAnyoneLiked}
        label={label}
        likeLength={likeLength}
        textStyle={textStyle}
      />
    </IconButton>
  );
});

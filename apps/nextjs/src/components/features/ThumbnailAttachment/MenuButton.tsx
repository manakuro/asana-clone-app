import type React from 'react';
import { useCallback, useMemo } from 'react';
import { useThumbnailAttachmentContext } from '@/components/features/ThumbnailAttachment/Provider';
import { Icon, type IconProps } from '@/components/ui/icon';
import { IconButton, type IconButtonProps } from '@/components/ui/icon-button';
import { Menu, type MenuTriggerProps } from '@/components/ui/menu';
import { transitions } from '@/styles/transitions';

type Props = Omit<MenuTriggerProps, 'children'> & {
  light?: IconButtonProps['light'];
  color: IconProps['color'];
};

export function MenuButton(props: Props) {
  const { isHovering, thumbnailMenuOpened } = useThumbnailAttachmentContext();
  const show = useMemo(
    () => isHovering || thumbnailMenuOpened,
    [isHovering, thumbnailMenuOpened],
  );
  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <Menu.Trigger asChild {...props}>
      <IconButton
        aria-label="Attachment button"
        size="sm"
        variant="ghost"
        position="absolute"
        top={4}
        right={1}
        zIndex="docked"
        visibility={show ? 'visible' : 'hidden'}
        transition={transitions.base('background')}
        onClick={handleClick}
      >
        <Icon icon="chevronDown" color={props.color} />
      </IconButton>
    </Menu.Trigger>
  );
}

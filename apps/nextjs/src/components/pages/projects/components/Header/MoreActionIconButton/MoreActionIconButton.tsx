import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Menu } from '@/components/ui/menu';
import { MenuList } from './MenuList';

type Props = {
  projectId: string;
};

export const MoreActionIconButton = memo(function MoreActionIconButton(
  props: Props,
) {
  const { projectId } = props;

  return (
    <Menu.Root positioning={{ placement: 'bottom-start' }} lazyMount>
      <Menu.Trigger asChild>
        <IconButton
          ml={1}
          aria-label="More actions"
          variant="ghost"
          h={6}
          w={6}
        >
          <Icon icon="chevronDown" color="fg.muted" />
        </IconButton>
      </Menu.Trigger>
      <MenuList projectId={projectId} />
    </Menu.Root>
  );
});

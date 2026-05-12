import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Menu } from '@/components/ui/Menu';
import { useDisclosure } from '@/shared/chakra';
import { MenuList } from './MenuList';

type Props = {
  projectId: string;
};

export const MoreActionIconButton = memo(function MoreActionIconButton(
  props: Props,
) {
  const { projectId } = props;
  const { onClose, onOpen, open } = useDisclosure();

  const handleOpen = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Menu.Root
      positioning={{ placement: 'bottom-start' }}
      closeOnSelect={false}
      open={open}
      lazyMount
    >
      <Menu.Trigger asChild>
        <IconButton
          ml={1}
          aria-label="More actions"
          variant="ghost"
          onClick={handleOpen}
          h={6}
          w={6}
        >
          <Icon icon="chevronDown" color="fg.muted" />
        </IconButton>
      </Menu.Trigger>
      {open && <MenuList onCloseMenu={onClose} projectId={projectId} />}
    </Menu.Root>
  );
});

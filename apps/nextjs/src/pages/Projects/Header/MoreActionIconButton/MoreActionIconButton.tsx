import { Icon, IconButton, PortalManager } from '@/components/ui/atoms';
import { Menu, MenuButton } from '@/components/ui/organisms/Menu';
import { useDisclosure } from '@/shared/chakra';
import { memo, useCallback } from 'react';
import { MenuList } from './MenuList';

type Props = {
  projectId: string;
};

export const MoreActionIconButton = memo(function MoreActionIconButton(
  props: Props,
) {
  const { projectId } = props;
  const { onClose, onOpen, isOpen } = useDisclosure();

  const handleOpen = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <PortalManager zIndex={1500}>
      <Menu
        placement="bottom-start"
        closeOnBlur={false}
        closeOnSelect={false}
        isOpen={isOpen}
        isLazy
      >
        <MenuButton
          ml={1}
          aria-label="More actions"
          as={IconButton}
          icon={<Icon icon="chevronDown" color="text.muted" />}
          variant="ghost"
          onClick={handleOpen}
          h={6}
          w={6}
        />
        {isOpen && <MenuList onCloseMenu={onClose} projectId={projectId} />}
      </Menu>
    </PortalManager>
  );
});

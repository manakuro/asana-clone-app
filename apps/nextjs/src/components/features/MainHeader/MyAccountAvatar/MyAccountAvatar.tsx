import { memo } from 'react';
import { MyAvatar } from '@/components/features/MyAvatar';
import { Menu } from '@/components/ui/Menu';
import { useDisclosure } from '@/shared/chakra';
import { MenuList } from './MenuList';

export const MyAccountAvatar = memo(function MyAccountAvatar() {
  const { onClose, setOpen, open } = useDisclosure();

  return (
    <Menu.Root
      positioning={{ placement: 'bottom-end' }}
      closeOnSelect={false}
      open={open}
      lazyMount
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Menu.Trigger asChild cursor="pointer">
        <MyAvatar size="sm" />
      </Menu.Trigger>
      {open && <MenuList onCloseMenu={onClose} />}
    </Menu.Root>
  );
});

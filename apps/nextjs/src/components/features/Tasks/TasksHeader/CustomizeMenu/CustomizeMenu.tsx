import type React from 'react';
import { Drawer } from '@/components/ui/Drawer';
import { Portal } from '@/components/ui/Portal';
import { Content } from './Content';
import { useCustomizeMenu } from './useCustomizeMenu';

export const CustomizeMenu: React.FC = () => {
  const { open, setIsOpen } = useCustomizeMenu();

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(e) => setIsOpen(e.open)}
      placement="end"
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Content />
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

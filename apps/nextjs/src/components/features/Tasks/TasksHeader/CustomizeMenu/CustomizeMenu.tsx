import type React from 'react';
import { Drawer } from '@/components/ui/drawer';
import { Portal } from '@/components/ui/portal';
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
        <Drawer.Positioner>
          <Content />
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

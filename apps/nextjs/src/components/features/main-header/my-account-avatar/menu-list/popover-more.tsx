import { useCallback } from 'react';
import { Menu, type MenuRootProps } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';

type Props = MenuRootProps;

export function PopoverMore(props: Props) {
  const handleCreateNewWorkspace = useCallback(() => {}, []);

  const handleRemoveMe = useCallback(() => {}, []);

  return (
    <Menu.Root {...props}>
      <Menu.TriggerItem asChild>{props.children}</Menu.TriggerItem>
      <Portal>
        <Menu.Positioner>
          <Menu.Content animation="none">
            <Menu.Item
              value="Create New Workspace"
              onSelect={handleCreateNewWorkspace}
              disabled
            >
              Create New Workspace
            </Menu.Item>
            <Menu.Item
              value="Remove me from this Workspace"
              onSelect={handleRemoveMe}
              disabled
            >
              Remove me from this Workspace
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

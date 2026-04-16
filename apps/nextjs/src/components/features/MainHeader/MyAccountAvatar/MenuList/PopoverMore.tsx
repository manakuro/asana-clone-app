import { useCallback } from 'react';
import { Menu, type MenuRootProps } from '@/components/ui/Menu';
import { Portal } from '@/components/ui/Portal';

type Props = {
  onClose: () => void;
} & MenuRootProps;

export function PopoverMore(props: Props) {
  const handleCreateNewWorkspace = useCallback(() => {
    props.onClose();
  }, [props]);

  const handleRemoveMe = useCallback(() => {
    props.onClose();
  }, [props]);

  return (
    <Menu.Root lazyMount {...props}>
      <Menu.TriggerItem w="full" asChild>
        {props.children}
      </Menu.TriggerItem>
      <Portal>
        <Menu.Positioner>
          <Menu.Content pointerEvents="auto" mr="5px">
            <Menu.Item value="0" onClick={handleCreateNewWorkspace} disabled>
              Create New Workspace
            </Menu.Item>
            <Menu.Item value="1" onClick={handleRemoveMe} disabled>
              Remove me from this Workspace
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

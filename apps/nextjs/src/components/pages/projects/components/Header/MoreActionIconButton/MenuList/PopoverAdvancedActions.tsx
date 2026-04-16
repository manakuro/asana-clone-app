import { Menu, type MenuRootProps } from '@/components/ui/Menu';
import { Portal } from '@/components/ui/Portal';

type Props = {
  onClose: () => void;
} & MenuRootProps;

export function PopoverAdvancedActions(props: Props) {
  return (
    <Menu.Root lazyMount {...props}>
      <Menu.TriggerItem w="full" asChild>
        {props.children}
      </Menu.TriggerItem>
      <Portal></Portal>
      <Menu.Positioner>
        <Menu.Content pointerEvents="auto" mr="5px">
          <Menu.Item value="">Make a subtask of</Menu.Item>
          <Menu.Item value="">Convert to a project</Menu.Item>
          <Menu.Item value="">
            Merge duplicate tasks
            <Menu.ItemCommand>⇧+Tab+D</Menu.ItemCommand>
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
